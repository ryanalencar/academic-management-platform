import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types';
import {
  MdDashboard,
  MdMenuBook,
  MdClass,
  MdPeople,
  MdGrading,
  MdLogout,
  MdDarkMode,
  MdLightMode,
} from 'react-icons/md';

export function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    document.body.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  function handleLogout() {
    logout();
    navigate('/login');
  }

  const isProfessor = user?.type === UserRole.PROFESSOR;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>📚 Acadêmico</h2>
          <button
            onClick={() => setDark(!dark)}
            className="theme-toggle"
            title={dark ? 'Modo claro' : 'Modo escuro'}
          >
            {dark ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
          </button>
        </div>
        <p className="sidebar-user">{user?.name}</p>
        <span className="sidebar-role">
          {isProfessor ? 'Professor' : 'Aluno'}
        </span>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <MdDashboard /> Dashboard
        </NavLink>

        <NavLink to="/disciplines" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <MdMenuBook /> Disciplinas
        </NavLink>

        <NavLink to="/classes" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <MdClass /> Turmas
        </NavLink>

        <NavLink to="/enrollments" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <MdPeople /> Matrículas
        </NavLink>

        <NavLink to="/grades" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <MdGrading /> Notas
        </NavLink>
      </nav>

      <button className="btn btn-logout" onClick={handleLogout}>
        <MdLogout /> Sair
      </button>
    </aside>
  );
}
