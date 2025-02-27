"use client";

import { useState } from "react";
import styles from "./select.module.scss";

interface Option {
  value: string;
  label: string;
}

interface SelectAuthProps {
  text: string;
  options: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SelectAuth({ options, onChange, placeholder, text }: SelectAuthProps) {
  const [selected, setSelected] = useState<string>("");

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelected(value);
    if (onChange) onChange(value);
  };

  return (
    <div>
    <label className={styles.label}>{text}</label>
    <select name="" id="" className={styles.select} required>
        <option value="" disabled selected>{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
    </select>
    </div>
  );
}
