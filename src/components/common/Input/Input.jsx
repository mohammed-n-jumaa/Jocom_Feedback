import React, { forwardRef } from 'react';
import styles from './Input.module.css';
import clsx from 'clsx';

const Input = forwardRef(({
  type = 'text',
  label,
  error,
  helperText,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className,
  containerClassName,
  disabled = false,
  required = false,
  ...props
}, ref) => {
  const containerClasses = clsx(
    styles.inputContainer,
    {
      [styles.fullWidth]: fullWidth,
      [styles.hasError]: error,
      [styles.disabled]: disabled,
    },
    containerClassName
  );

  const inputClasses = clsx(
    styles.input,
    {
      [styles.withIconLeft]: icon && iconPosition === 'left',
      [styles.withIconRight]: icon && iconPosition === 'right',
      [styles.error]: error,
    },
    className
  );

  return (
    <div className={containerClasses}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      
      <div className={styles.inputWrapper}>
        {icon && iconPosition === 'left' && (
          <span className={styles.iconLeft}>{icon}</span>
        )}
        
        <input
          ref={ref}
          type={type}
          className={inputClasses}
          disabled={disabled}
          {...props}
        />
        
        {icon && iconPosition === 'right' && (
          <span className={styles.iconRight}>{icon}</span>
        )}
      </div>
      
      {(error || helperText) && (
        <span className={clsx(styles.helperText, { [styles.errorText]: error })}>
          {error || helperText}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;