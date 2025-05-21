import { useState } from "react";
import styles from "./customSelect.module.scss";

interface Option {
  label: string;
  value: string | number;
}

interface CustomSelectProps {
  name: string;
  text: string;
  options: Option[];
  // required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  selected?: string | number;
  onChange: (value: string) => void;
}

export default function CustomSelect({
  name,
  text,
  options,
  // required = false,
  disabled = false,
  placeholder = "Selecione uma opção",
  selected,
  onChange,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(selected ? String(selected) : "");

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onChange(value);
    setIsOpen(false);
  };

  const selectedLabel = options.find((opt) => String(opt.value) === selectedValue)?.label;

  return (
    <div className={styles.select_wrapper}>
      <label className={styles.label}>{text}</label>

      <input
        type="text"
        name={name}
        value={selectedValue}
        required
      />

      <div
        className={`${styles.select_display} ${disabled ? styles.disabled : ""}`}
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        tabIndex={0}
      >
        {selectedLabel || placeholder}
      </div>

      {isOpen && (
        <div className={styles.options_list}>
          {options.map((option) => (
            <div
              key={option.value}
              className={styles.option_item}
              onClick={() => handleSelect(String(option.value))}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
