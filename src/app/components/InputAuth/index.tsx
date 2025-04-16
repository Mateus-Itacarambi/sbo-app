import React from "react";
import styles from "./input.module.scss";

interface InputAuthProps {
  label: string;
  name?: string;
  type: "text" | "email" | "password" | "date" | "tel" | "textarea";
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  disabled?: boolean;
}

export default function InputAuth({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  disabled = false,
}: InputAuthProps) {
  return (
    <div className={styles.input_field}>
      <label>{label}</label>
      {type === "textarea" ? (
        <textarea
          required
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={styles.textarea}
          maxLength={200}
        />
      ) : (
        <input
          required
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      )}
    </div>
  );
}
