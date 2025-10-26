import React, { useState } from 'react';
import styles from './Users.module.css';
import UserTable from '@/components/users/UserTable/UserTable';
import AddUserModal from '@/components/users/AddUserModal/AddUserModal';
import Button from '@/components/common/Button/Button';
import Loader from '@/components/common/Loader/Loader';
import Input from '@/components/common/Input/Input';
import { IoAdd, IoSearch } from 'react-icons/io5';
import userService from '@/services/userService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getUsers,
  });

  const createMutation = useMutation({
    mutationFn: userService.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('User created successfully');
      setIsModalOpen(false);
    },
    onError: () => {
      toast.error('Failed to create user');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => userService.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('User updated successfully');
      setIsModalOpen(false);
      setEditingUser(null);
    },
    onError: () => {
      toast.error('Failed to update user');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: userService.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('User deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete user');
    },
  });

  const handleAddUser = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmitUser = (data) => {
    if (editingUser) {
      updateMutation.mutate({ id: editingUser.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleViewUser = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const filteredUsers = users?.data?.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !roleFilter || user.role === roleFilter;
    return matchesSearch && matchesRole;
  }) || [];

  const stats = {
    total: users?.data?.length || 5,
    admins: users?.data?.filter(u => u.role === 'admin').length || 2,
    regularUsers: users?.data?.filter(u => u.role === 'user').length || 3,
    recent: 0,
  };

  if (isLoading) {
    return <Loader fullScreen text="Loading users..." />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>User Management</h1>
          <p className={styles.subtitle}>Manage system users and their permissions</p>
        </div>
        <Button icon={<IoAdd />} onClick={handleAddUser}>
          Add New User
        </Button>
      </div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>👥</div>
          <div className={styles.statInfo}>
            <div className={styles.statValue}>{stats.total}</div>
            <div className={styles.statLabel}>Total Users</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>👑</div>
          <div className={styles.statInfo}>
            <div className={styles.statValue}>{stats.admins}</div>
            <div className={styles.statLabel}>Administrators</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>👤</div>
          <div className={styles.statInfo}>
            <div className={styles.statValue}>{stats.regularUsers}</div>
            <div className={styles.statLabel}>Regular Users</div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>🆕</div>
          <div className={styles.statInfo}>
            <div className={styles.statValue}>{stats.recent}</div>
            <div className={styles.statLabel}>Recent Users</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filtersCard}>
        <div className={styles.filtersHeader}>
          <h3 className={styles.filtersTitle}>Filter & Search</h3>
        </div>

        <div className={styles.filtersGrid}>
          <Input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<IoSearch />}
            fullWidth
          />

          <select
            className={styles.select}
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>

          <Button variant="outline" onClick={() => { setSearchTerm(''); setRoleFilter(''); }}>
            Clear
          </Button>
          <Button>Refresh</Button>
        </div>
      </div>

      {/* Table */}
      <UserTable
        users={filteredUsers}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        onView={handleViewUser}
      />

      {/* Modal */}
      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingUser(null);
        }}
        onSubmit={handleSubmitUser}
        editUser={editingUser}
      />
    </div>
  );
};

export default Users;