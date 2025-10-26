import React from 'react';
import styles from './Loader.module.css';
import clsx from 'clsx';

const Loader = ({ size = 'medium', fullScreen = false, text }) => {
  const loaderClasses = clsx(styles.loader, {
    [styles.fullScreen]: fullScreen,
  });

  const spinnerClasses = clsx(styles.spinner, styles[size]);

  return (
    <div className={loaderClasses}>
      <img 
        src="/loading.png" 
        alt="Loading..." 
        className={spinnerClasses}
      />
      {text && <p className={styles.text}>{text}</p>}
    </div>
  );
};

export default Loader;