import React from 'react';
import Input from '@/components/common/Input/Input';

const ShortText = ({ value, onChange, error }) => {
  return (
    <Input
      type="text"
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      error={error}
      placeholder="Type your answer here..."
      fullWidth
    />
  );
};

export default ShortText;