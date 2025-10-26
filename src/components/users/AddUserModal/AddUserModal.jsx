import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Modal from '@/components/common/Modal/Modal';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import styles from './AddUserModal.module.css';
import { userSchema } from '@/utils/validators';
import { USER_ROLES } from '@/utils/constants';
import { MdEmail, MdPerson, MdLock } from 'react-icons/md';

const AddUserModal = ({ isOpen, onClose, onSubmit, editUser = null }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: editUser || {
      name: '',
      email: '',
      password: '',
      role: USER_ROLES.USER,
    },
    context: { isEdit: !!editUser },
  });

  const onFormSubmit = (data) => {
    onSubmit(data);
    reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={editUser ? 'Edit User' : 'Add New User'}
      size="medium"
    >
      <form onSubmit={handleSubmit(onFormSubmit)} className={styles.form}>
        <Input
          {...register('name')}
          label="Full Name *"
          icon={<MdPerson />}
          error={errors.name?.message}
          placeholder="John Doe"
          fullWidth
        />

        <Input
          {...register('email')}
          type="email"
          label="Email Address *"
          icon={<MdEmail />}
          error={errors.email?.message}
          placeholder="john@example.com"
          fullWidth
        />

        {!editUser && (
          <Input
            {...register('password')}
            type="password"
            label="Password *"
            icon={<MdLock />}
            error={errors.password?.message}
            placeholder="••••••••"
            fullWidth
          />
        )}

        <div className={styles.formGroup}>
          <label className={styles.label}>Role *</label>
          <select
            {...register('role')}
            className={styles.select}
          >
            <option value={USER_ROLES.USER}>User</option>
            <option value={USER_ROLES.ADMIN}>Admin</option>
          </select>
          {errors.role && (
            <span className={styles.error}>{errors.role.message}</span>
          )}
        </div>

        <div className={styles.roleInfo}>
          <h4>Role Permissions:</h4>
          <ul>
            <li><strong>Admin:</strong> Full access to all features</li>
            <li><strong>User:</strong> Access to Dashboard and Feedbacks only</li>
          </ul>
        </div>

        <div className={styles.actions}>
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit">
            {editUser ? 'Update User' : 'Add User'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddUserModal;