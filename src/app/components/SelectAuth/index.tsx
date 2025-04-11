import { useEffect, useState } from "react";
import styles from "./select.module.scss";

interface Option {
  value: string | number;
  label: string;
}

interface SelectAuthProps {
  text: string;
  options: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
  selected?: string | number; // <- novo
  disabled?: boolean; // <- novo
}

export default function SelectAuth({
  text,
  options,
  onChange,
  placeholder = "Selecione uma opção",
  selected,
  disabled = false,
}: SelectAuthProps) {
  const [selectedValue, setSelectedValue] = useState<string>("");

  // Atualiza o select quando a prop `selected` muda (ex: ao carregar dados do usuário)
  useEffect(() => {
    if (selected !== undefined && selected !== null) {
      setSelectedValue(String(selected));
    }
  }, [selected]);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <div>
      <label className={styles.label}>{text}</label>
      <select
        value={selectedValue}
        onChange={handleSelect}
        className={styles.select}
        required
        disabled={disabled}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
