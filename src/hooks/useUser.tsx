
import {createContext, type ReactNode, useContext, useEffect, useState} from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

export type User = {
  name: string;
  password: string;
};

export type AuthContextType = {
  user: User;
  isAuthorized: boolean;
  login: (name: string, password: string) => boolean;
  logout: () => void;
  setUser: (user: User) => User;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialUser: User = { name: "admin", password: "admin" };

export function AuthProvider({ children }: { children: ReactNode }) {
  const [storedUser, setStoredUser] = useLocalStorage("user", initialUser);
  const [storedIsAuth, setStoredIsAuth] = useLocalStorage("isAuth", false);

  // Локальное состояние (чтобы компоненты ререндерились)
  const [user, setUser] = useState<User>(storedUser);
  const [isAuthorized, setIsAuthorized] = useState(storedIsAuth);

  // Синхронизация локального состояния с localStorage
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(storedUser);
    setIsAuthorized(storedIsAuth);
  }, [storedUser, storedIsAuth]);

  // Синхронизация между вкладками
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "user" && e.newValue !== JSON.stringify(user)) {
        setStoredUser(e.newValue ? JSON.parse(e.newValue) : null);
      }
      if (e.key === "isAuth" && e.newValue !== JSON.stringify(isAuthorized)) {
        setStoredIsAuth(e.newValue ? JSON.parse(e.newValue) : false);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [user, isAuthorized, setStoredIsAuth, setStoredUser]);

  const login = (name: string, password: string): boolean => {
    if (name !== user.name || password !== user.password) {
      alert("Ошибка авторизации");
      return false;
    }

    const authenticatedUser = { name, password };
    setStoredUser(authenticatedUser);
    setStoredIsAuth(true);
    alert("Авторизация успешна");
    return true;
  };

  const logout = () => {
    setStoredUser(null);
    setStoredIsAuth(false);
  };

  return (
    <AuthContext.Provider
      value={{
    user,
      isAuthorized,
      login,
      logout,
      setUser: setStoredUser,
    }}
  >
    {children}
    </AuthContext.Provider>
  );
}


// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUser must be used within AuthProvider");
  }
  return context;
}


// import useLocalStorage from "@/hooks/useLocalStorage.ts";
// import {useContext, useEffect} from "react";
//
// const initialUser = {
//   name: 'admin',
//   password: 'admin',
// }
//
// export type User = {
//   name: string;
//   password: string;
// }
//
//
// export function useUser(){
//   // user и isAuthorized полностью привязаны к localStorage
//   const [storedUser, setStoredUser] = useLocalStorage('user', initialUser);
//   const [user, setUser] = useContext(storedUser)
//
//   function auth(name: string, password: string): boolean {
//     if (name !== user.name || password !== user.password) {
//       alert('Ошибка авторизации')
//       return false;
//     }
//     setIsAuthorized(true);
//     alert('Авторизация успешна')
//     return true;
//   }
//
//
//   useEffect(() => {
//     const handleStorage = (e: StorageEvent) => {
//       if (!e.key) return;
//
//       if (e.key === 'user' && e.newValue) {
//         try {
//           const parsedUser = JSON.parse(e.newValue);
//           setUser(parsedUser);
//         } catch (err) {
//           console.error('Ошибка парсинга user из localStorage', err);
//         }
//       }
//
//       if (e.key === 'isAuth' && e.newValue) {
//         try {
//           const parsedIsAuth = JSON.parse(e.newValue);
//           setIsAuthorized(parsedIsAuth);
//         } catch (err) {
//           console.error('Ошибка парсинга isAuth из localStorage', err);
//         }
//       }
//     };
//
//     window.addEventListener('storage', handleStorage);
//     return () => window.removeEventListener('storage', handleStorage);
//   }, [setUser, setIsAuthorized]);
//
//   return{
//     user,
//     setUser,
//     auth,
//     isAuthorized,
//     setIsAuthorized
//   }
//
// }