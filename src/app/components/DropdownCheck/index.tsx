import { useState, useRef, useEffect } from "react";
import styles from "./DropdownCheck.module.scss";
import { Plus, Minus } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface Props {
  label: string;
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

export default function DropdownCheck({ label, options, selectedValues, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(true); // começa aberto, como na imagem
  const [searchTerm, setSearchTerm] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const toggleOption = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.dropdownContainer} ref={ref}>
      <div className={styles.labelRow} onClick={() => setIsOpen(!isOpen)}>
        <span>{label}</span>
        <button className={styles.toggleBtn}>{isOpen ? <Minus /> : <Plus />}</button>
      </div>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className={styles.searchIcon}>🔍</span>
          </div>
          <div className={styles.optionsList}>
            {filteredOptions.map((opt) => (
              <label key={opt.value} className={styles.optionItem}>
                <input
                  type="checkbox"
                  checked={selectedValues.includes(opt.value)}
                  onChange={() => toggleOption(opt.value)}
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
