import React from 'react';
import Input from '@/components/common/Input/Input';
import { MdEmail } from 'react-icons/md';

const EmailInput = ({ value, onChange, error, label }) => {
  return (
    <Input
      type="email"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      error={error}
      label={label}
      placeholder="Please Enter Your Email"
      icon={<MdEmail />}
      fullWidth
    />
  );
};

export default EmailInput;