'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import styles from './dropdown.module.scss';

type DropdownItem =
  | { type: 'link'; label: string; href: string }
  | { type: 'action'; label: string; onClick: () => void };

interface DropdownProps {
  label: string;
  items: DropdownItem[];
}

export default function Dropdown({ label, items }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button onClick={() => setIsOpen((prev) => !prev)} className={styles.button}>
        {label}
        <ChevronDown className={styles.icon} />
      </button>
      
      {isOpen && (
        <div className={styles.menu}>
          {items.map((item, idx) => {
            if (item.type === 'link') {
              return (
                <Link
                  key={idx}
                  href={item.href}
                  className={styles.menuItem}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              );
            }

            if (item.type === 'action') {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    item.onClick();
                    setIsOpen(false);
                  }}
                  className={styles.menuItem}
                >
                  {item.label}
                </button>
              );
            }

            return null;
          })}
        </div>
      )}
    </div>
  );
}
