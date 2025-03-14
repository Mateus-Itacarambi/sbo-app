"use client";

import Link from "next/link";
import Logo from "../Logo";
import styles from "./navbar.module.scss";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import iconBell from "@/app/assets/bell.png";

interface User {
  name: string;
  profileImage?: string;
}

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={isActive ? styles.ativo : ""}
    >
      {children}
    </Link>
  );
};

const NavBar = () => {
  const [user, setUser] = useState<User | null>({
    name: "João Silva",
    profileImage: "", // Deixe vazio para testar as iniciais
  });

  const getInitials = (nome: string) => {
    const nomes = nome.split(" ");
    return nomes.length > 1
      ? `${nomes[0][0]}${nomes[nomes.length - 1][0]}`.toUpperCase()
      : nomes[0][0].toUpperCase();
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.nav__container}>
        <Logo />
        <ul className={styles.nav__ul}>
          <li tabIndex={0} className={styles.nav__li}>
            <NavLink href="/">Início</NavLink>
          </li>
          <li className={styles.nav__li}>
            <NavLink href="/professores">Professores</NavLink>
          </li>
          <li className={styles.nav__li}>
            <NavLink href="/temas">Temas</NavLink>
          </li>
          <li className={styles.nav__li}>
            <NavLink href="/cursos">Cursos</NavLink>
          </li>
          <li className={styles.nav__li}>
            <NavLink href="/sobre">Sobre</NavLink>
          </li>
        </ul>
        <div className={styles.actions}>
          {user ? (
            <div className={styles.userSection}>
              <Image src={iconBell} width={23} alt="Ícone de sino" />

              <Link href={`/perfil/mateus-itacarambi`}>
                <div className={styles.profile}>
                  {user.profileImage ? (
                    <Image
                      src={user.profileImage}
                      width={45}
                      height={45}
                      alt="Foto de perfil"
                      className={styles.profileImage}
                    />
                  ) : (
                    <div className={styles.initials}>
                      {getInitials(user.name)}
                    </div>
                  )}
                </div>
              </Link>

              <div className={styles.dropdown}>
                <div className={styles.box}>
                  <i className={styles.arrow}></i>
                </div>
                <div className={styles.dropdownContent}>
                  <Link href="/perfil">Perfil</Link>
                  <Link href="/configuracoes">Configurações</Link>
                  <button onClick={() => setUser(null)}>Sair</button>
                </div>
              </div>
            </div>
          ) : (
            <Link href={"/login"}>
              <button className={styles.nav__button}>Login</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
