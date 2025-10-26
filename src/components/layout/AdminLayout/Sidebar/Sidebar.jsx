import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';
import { 
  MdDashboard, 
  MdQuestionAnswer, 
  MdFeedback, 
  MdPeople,
  MdLogout 
} from 'react-icons/md';
import useAuthStore from '@/store/authStore';
import { useAuth } from '@/hooks/useAuth';
import { USER_ROLES } from '@/utils/constants';

const Sidebar = ({ isOpen, onClose, isMobile }) => {
  const { user } = useAuthStore();
  const { logout } = useAuth();
  const location = useLocation();

  const menuItems = [
    {
      title: 'Dashboard',
      icon: <MdDashboard />,
      path: '/admin/dashboard',
      description: 'Analytics & Overview',
      roles: [USER_ROLES.ADMIN, USER_ROLES.USER],
    },
    {
      title: 'Questions',
      icon: <MdQuestionAnswer />,
      path: '/admin/questions',
      description: 'Manage feedback Questions',
      roles: [USER_ROLES.ADMIN],
      badge: 'ADMIN',
    },
    {
      title: 'Feedback',
      icon: <MdFeedback />,
      path: '/admin/feedbacks',
      description: 'View All Responses',
      roles: [USER_ROLES.ADMIN, USER_ROLES.USER],
    },
    {
      title: 'User Management',
      icon: <MdPeople />,
      path: '/admin/users',
      description: 'Manage System Users',
      roles: [USER_ROLES.ADMIN],
      badge: 'ADMIN',
    },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(user?.role)
  );

  const handleMenuClick = () => {
    if (isMobile) {
      onClose();
    }
  };

  return (
    <>
      {isMobile && isOpen && (
        <div 
          className={styles.overlay} 
          onClick={onClose}
        />
      )}
      
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <div className={styles.logoContainer}>
            <img src="/logo.png" alt="JoCom" className={styles.logo} />
          </div>
        </div>

        <div className={styles.userProfile}>
          <div className={styles.userAvatar}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className={styles.userInfo}>
            <h6 className={styles.userName}>{user?.name}</h6>
            <small className={styles.userRole}>
              <span className={`${styles.badge} ${user?.role === USER_ROLES.ADMIN ? styles.badgeDanger : styles.badgeInfo}`}>
                {user?.role?.toUpperCase() || 'USER'}
              </span>
            </small>
          </div>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {filteredMenuItems.map((item) => (
              <li key={item.path} className={styles.navItem}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ''}`
                  }
                  onClick={handleMenuClick}
                >
                  <div className={styles.navIcon}>{item.icon}</div>
                  <div className={styles.navContent}>
                    <span className={styles.navLabel}>
                      {item.title}
                      {item.badge && (
                        <small className={styles.navBadge}>
                          {item.badge}
                        </small>
                      )}
                    </span>
                    <small className={styles.navDescription}>
                      {item.description}
                    </small>
                  </div>
                  {location.pathname === item.path && (
                    <div className={styles.activeIndicator} />
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.quickActions}>
          <h6 className={styles.quickActionsTitle}>Quick Actions</h6>
          <button 
            className={styles.quickActionBtn} 
            onClick={() => window.open('/maintenance', '_blank')}
          >
            <MdFeedback />
            View feedback
          </button>
        </div>

        <div className={styles.footer}>
          <div className={styles.userInfoFooter}>
            <div className={styles.userAvatar}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className={styles.userDetails}>
              <div className={styles.userName}>{user?.name}</div>
              <div className={styles.userRole}>
                {user?.role === USER_ROLES.ADMIN ? 'ADMIN' : 'USER'}
              </div>
            </div>
          </div>
          
          <button className={styles.logoutButton} onClick={logout}>
            <MdLogout />
          </button>
        </div>

        <div className={styles.copyright}>
          © 2025 JoCom Feedback<br />
          Logged in as: {user?.role}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;