import { useState } from 'react';

export const useFormulario = (initialState: any) => {
  const [formData, setFormData] = useState(initialState);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  return {
    formData,
    setFormData,
    handleChange
  };
};