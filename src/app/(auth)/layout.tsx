import styles from "../components/BarraLateral/barra-lateral.module.scss";
import BarraLateral from "../components/BarraLateral";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={styles.container}>
      <BarraLateral />
      {children}
    </main>
  );
}
