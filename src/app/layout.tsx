import { Inter } from 'next/font/google'
import NavBar from "@/app/components/NavBar";
import "./globals.css";

const inter = Inter({
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={inter.className}>
      <body>
        <NavBar/>
        {children}
      </body>
    </html>
  );
}
