import React from 'react';
import styles from './UserTable.module.css';
import { formatDate } from '@/utils/helpers';
import { DATE_FORMATS } from '@/utils/constants';
import { IoEye, IoPencil, IoTrash } from 'react-icons/io5';
import { USER_ROLES } from '@/utils/constants';

const UserTable = ({ users = [], onEdit, onDelete, onView }) => {
  const getRoleBadgeColor = (role) => {
    return role === USER_ROLES.ADMIN 
      ? 'rgba(239, 68, 68, 0.1)' 
      : 'rgba(37, 99, 235, 0.1)';
  };

  const getRoleTextColor = (role) => {
    return role === USER_ROLES.ADMIN ? '#ef4444' : '#2563eb';
  };

  return (
    <div className={styles.container}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>USER INFORMATION</th>
              <th>ROLE</th>
              <th>CREATED</th>
              <th>LAST UPDATED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className={styles.userCell}>
                      <div className={styles.avatar}>
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <div className={styles.userInfo}>
                        <div className={styles.userName}>{user.name}</div>
                        <div className={styles.userEmail}>{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span 
                      className={styles.roleBadge}
                      style={{ 
                        background: getRoleBadgeColor(user.role),
                        color: getRoleTextColor(user.role)
                      }}
                    >
                      {user.role === USER_ROLES.ADMIN ? '👑 ADMIN' : '👤 USER'}
                    </span>
                  </td>
                  <td>
                    <div className={styles.dateCell}>
                      <div className={styles.date}>
                        {formatDate(user.created_at, DATE_FORMATS.DISPLAY)}
                      </div>
                      <div className={styles.time}>
                        {user.created_at ? formatDate(user.created_at, 'HH:mm') : '-'}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={styles.dateCell}>
                      <div className={styles.date}>
                        {formatDate(user.updated_at, DATE_FORMATS.DISPLAY)}
                      </div>
                      <div className={styles.time}>
                        {user.updated_at ? formatDate(user.updated_at, 'HH:mm') : '-'}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button
                        className={styles.actionBtn}
                        onClick={() => onView(user)}
                        title="View"
                      >
                        <IoEye />
                      </button>
                      <button
                        className={styles.actionBtn}
                        onClick={() => onEdit(user)}
                        title="Edit"
                      >
                        <IoPencil />
                      </button>
                      <button
                        className={styles.actionBtnDanger}
                        onClick={() => onDelete(user.id)}
                        title="Delete"
                      >
                        <IoTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className={styles.emptyState}>
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;