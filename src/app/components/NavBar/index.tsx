"use client";

import Link from 'next/link';
import Logo from '../Logo';
import styles from './navbar.module.scss'
import { useState } from "react";
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import iconBell from '@/app/assets/bell.png'
import Arrow from '../Arrow';

interface User {
  name: string;
  profileImage?: string; // Pode ser undefined caso não tenha foto
}

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
  const [user, setUser] = useState<User | null>({
    name: "João Silva",
    profileImage: "", // Deixe vazio para testar as iniciais
  });

  const getInitials = (name: string) => {
    const names = name.split(" ");
    return names.length > 1
      ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
      : names[0][0].toUpperCase();
  };

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
            <div className={styles.actions}>
              {user ? (
                <div className={styles.userSection}>
                  {/* Ícone de Sino */}
                  <Image src={iconBell} width={23} alt="Ícone de sino"/>

                  {/* Foto de perfil ou iniciais */}
                  <div className={styles.profile}>
                    {user.profileImage ? (
                      <Image src={user.profileImage} width={45} height={45} alt="Foto de perfil" className={styles.profileImage} />
                    ) : (
                      <div className={styles.initials}>
                        {getInitials(user.name)}
                      </div>
                    )}
                  </div>

                  {/* Dropdown */}
                  <div className={styles.dropdown}>
                    <Arrow tamanho="4"/>
                    <div className={styles.dropdownContent}>
                      <Link href="/perfil">Perfil</Link>
                      <Link href="/configuracoes">Configurações</Link>
                      <button onClick={() => setUser(null)}>Sair</button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link href={"/login"}>
                  <button className={styles.nav__button}>
                    Login
                  </button>
                </Link>
              )}
            </div>
        </div>
      </nav>
  );
};

export default NavBar;
