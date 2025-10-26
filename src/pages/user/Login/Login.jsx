import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Login.module.css';
import Input from '@/components/common/Input/Input';
import Button from '@/components/common/Button/Button';
import { useAuth } from '@/hooks/useAuth';
import { loginSchema } from '@/utils/validators';
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { IoArrowBack } from 'react-icons/io5';

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoginLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data) => {
    login(data);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <img src="/logo.png" alt="JoCom" />
          </div>
          <h1 className={styles.title}>JoCom Portal</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Input
            {...register('email')}
            type="email"
            label="Email Address"
            icon={<MdEmail />}
            error={errors.email?.message}
            placeholder="admin@jocom.jo"
            fullWidth
          />

          <div className={styles.passwordWrapper}>
            <Input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              label="Password"
              icon={<MdLock />}
              error={errors.password?.message}
              placeholder="••••••••••"
              fullWidth
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={styles.togglePasswordButton}
              aria-label={showPassword ? 'إخفاء كلمة السر' : 'إظهار كلمة السر'}
            >
              {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </button>
          </div>

          <Button
            type="submit"
            fullWidth
            loading={isLoginLoading}
            size="large"
          >
            SIGN IN
          </Button>
        </form>

        <Link to="/maintenance" className={styles.backLink}>
          <IoArrowBack />
          Back to feedback
        </Link>
      </div>
    </div>
  );
};

export default Login;