"use client";

import "../globals.css";
import NavBar from "../components/NavBar";
import { AuthProvider } from "@/contexts/AuthContext";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthProvider>
        <NavBar />
        <main>{children}</main>
      </AuthProvider>
    </>
  );
}