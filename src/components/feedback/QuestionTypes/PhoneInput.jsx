import React from 'react';
import Input from '@/components/common/Input/Input';
import { MdPhone } from 'react-icons/md';

const PhoneInput = ({ value, onChange, error, label }) => {
  const handleChange = (e) => {
    const input = e.target.value.replace(/\D/g, ''); // Remove non-digits
    onChange(input);
  };

  return (
    <Input
      type="tel"
      value={value || ''}
      onChange={handleChange}
      error={error}
      label={label}
      placeholder="0790123456"
      icon={<MdPhone />}
      fullWidth
    />
  );
};

export default PhoneInput;