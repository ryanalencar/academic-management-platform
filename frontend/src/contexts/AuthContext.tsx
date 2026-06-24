import { createContext, useState, useEffect, type ReactNode } from 'react';
import type { User, LoginRequest, RegisterStudentRequest, RegisterProfessorRequest } from '../types';
import { authService } from '../services/authService';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  registerStudent: (data: RegisterStudentRequest) => Promise<void>;
  registerProfessor: (data: RegisterProfessorRequest) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

function applyRoleClass(userType?: string) {
  document.body.classList.remove('role-student', 'role-professor');
  if (userType === 'STUDENT') document.body.classList.add('role-student');
  if (userType === 'PROFESSOR') document.body.classList.add('role-professor');
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      const parsed = JSON.parse(storedUser);
      setToken(storedToken);
      setUser(parsed);
      applyRoleClass(parsed.type);
    }
    setLoading(false);
  }, []);

  function saveAuth(accessToken: string, userData: User) {
    localStorage.setItem('token', accessToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(accessToken);
    setUser(userData);
    applyRoleClass(userData.type);
  }

  async function login(data: LoginRequest) {
    const response = await authService.login(data);
    saveAuth(response.accessToken, response.user);
  }

  async function registerStudent(data: RegisterStudentRequest) {
    const response = await authService.registerStudent(data);
    saveAuth(response.accessToken, response.user);
  }

  async function registerProfessor(data: RegisterProfessorRequest) {
    const response = await authService.registerProfessor(data);
    saveAuth(response.accessToken, response.user);
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    applyRoleClass();
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        loading,
        login,
        registerStudent,
        registerProfessor,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
