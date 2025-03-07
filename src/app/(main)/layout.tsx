import "../globals.css";
import NavBar from "../components/NavBar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
