import React from "react";
import styles from "./input.module.scss";

interface InputAuthProps {
  label: string;
  type: "text" | "email" | "password" | "date" | "tel";
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export default function InputAuth({ label, type, placeholder, value, onChange, disabled = false, }: InputAuthProps) {
  return (
    <div className={styles.input_field}>
      <label>{label}</label>
      <input
        required
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
}
