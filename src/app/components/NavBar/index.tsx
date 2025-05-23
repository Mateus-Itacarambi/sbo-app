"use client";

import Link from "next/link";
import Logo from "../Logo";
import styles from "./navbar.module.scss";
import Image from "next/image";
import { usePathname } from "next/navigation";
import iconBell from "@/assets/bell.png";
import Dropdown from "@/components/Dropdown";
import { getInitials } from "@/utils/getInitials";
import { useAuth } from "@/contexts/AuthContext";
import { Professor, Estudante } from "@/types";

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
  const { usuario, logout, loading } = useAuth();
  
  const professor = usuario?.role === "PROFESSOR" ? (usuario as Professor) : null;
  const estudante = usuario?.role === "ESTUDANTE" ? (usuario as Estudante) : null;
  const endpoint = estudante ? `/perfil/${estudante.matricula}` : professor ? `/perfil/${professor?.idLattes}` : "/perfil";

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
        {loading ? null : usuario ? (
            <div className={styles.userSection}>
              <Image src={iconBell} width={23} alt="Ícone de sino" />

              <Link href={`${endpoint}`}>
                <div className={styles.profile}>
                  {usuario.profileImage ? (
                    <Image
                      src={usuario.profileImage}
                      width={45}
                      height={45}
                      alt="Foto de perfil"
                      className={styles.profileImage}
                    />
                  ) : (
                    <div className={styles.initials}>
                      {getInitials(usuario.nome)}
                    </div>
                  )}
                </div>
              </Link>
              
              {estudante ? (
                <Dropdown
                  label=""
                  items={[
                    { type: "link", label: "Perfil", href: `${endpoint}` },
                    { type: "link", label: "Alterar Senha", href: "/alterar-senha" },
                    { type: "action", label: "Sair", onClick: logout },
                  ]}
                />
              ) : professor ? (
                <Dropdown
                  label=""
                  items={[
                    { type: "link", label: "Perfil", href: `${endpoint}` },
                    { type: "link", label: "Configurações", href: "/configuracoes" },
                    { type: "link", label: "Temas", href: "/temas" },
                    { type: "action", label: "Sair", onClick: logout },
                  ]}
                />
              ) : usuario.role === "ADMINISTRADOR" ? (
                <Dropdown
                  width="220px"
                  label=""
                  items={[
                    { type: "link", label: "Perfil", href: `${endpoint}` },
                    { type: "link", label: "Configurações", href: "/configuracoes" },
                    { type: "link", label: "Importar Professores", href: "/professor-cadastro" },
                    { type: "link", label: "Importar Áreas de Interesse", href: "/area-interesse-cadastro" },
                    { type: "action", label: "Sair", onClick: logout },
                  ]}
                />
              ) : null}
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
