// // contexts/AuthContext.tsx
// import { createContext, useContext, useEffect, useState, ReactNode } from "react";
// import { useRouter } from "next/navigation";
// import { Estudante, Professor } from "@/types";

// type UsuarioCompleto = Estudante | Professor;

// type AuthContextType = {
//   user: UsuarioCompleto | null;
//   loading: boolean;
//   logout: () => void;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<UsuarioCompleto | null>(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await fetch("http://localhost:8080/auth/me", {
//           credentials: "include",
//         });

//         if (res.ok) {
//           const data = await res.json();
//           setUser(data);
//         } else {
//           setUser(null);
//         }
//       } catch (error) {
//         console.error("Erro ao buscar usuário:", error);
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   const logout = async () => {
//     try {
//       await fetch("http://localhost:8080/auth/logout", {
//         method: "POST",
//         credentials: "include",
//       });
//       setUser(null);
//       router.push("/login");
//     } catch (err) {
//       console.error("Erro ao fazer logout:", err);
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth deve ser usado dentro de um AuthProvider");
//   }
//   return context;
// };


// context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Estudante, Professor } from "@/types";

type UsuarioCompleto = Estudante | Professor;

interface AuthContextType {
  usuario: UsuarioCompleto | null;
  setUsuario: (usuario: UsuarioCompleto | null) => void;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  usuario: null,
  setUsuario: () => {},
  loading: false,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [usuario, setUsuario] = useState<UsuarioCompleto | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const res = await fetch("http://localhost:8080/auth/me", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUsuario(data);
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, []);

  const logout = async () => {
    try {
      await fetch("http://localhost:8080/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setUsuario(null);
      router.push("/login");
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
      router.push("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ usuario, setUsuario, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
  };