"use client";

import "./globals.css";
import NavBar from "./components/NavBar";
import { usePathname } from "next/navigation";
import BarraLateral from "./components/BarraLateral";
import styles from "./components/BarraLateral/barra-lateral.module.scss";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/auth");

  return (
    <html lang="pt-br">
      <body>
        <>
          <NavBar />
          <main>{children}</main>
        </>
        {/* {isAuthPage ? (
          <main className={styles.container}>
            <BarraLateral />
            {children}
          </main>
        ) : (
          <main>
            <NavBar />
            {children}
          </main>
        )} */}
      </body>
    </html>
  );
}
