"use client";

import Link from 'next/link';
import Logo from './Logo';
import styles from './navbar.module.scss'
import { usePathname } from 'next/navigation';

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} aria-current={isActive ? "page" : undefined} className={isActive ? styles.ativo : ""}>
      {children}
    </Link>
  );
};

const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.nav__container}>
        <Logo/>

        <ul className={styles.nav__ul}>
          <li className={styles.nav__li}>
            <NavLink href="/">
              Início
            </NavLink>
          </li>
          <li className={styles.nav__li}>
            <NavLink href="/professores">
              Professores
            </NavLink>
          </li>
          <li className={styles.nav__li}>
            <NavLink href="/temas">
              Temas
            </NavLink>
          </li>
          <li className={styles.nav__li}>
            <NavLink href="/cursos">
              Cursos
            </NavLink>
          </li>
          <li className={styles.nav__li}>
            <NavLink href="/sobre">
              Sobre
            </NavLink>
          </li>
        </ul>

        <Link href={"/login"}>
          <button className={styles.nav__button}>
            Login
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
