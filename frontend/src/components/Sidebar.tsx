import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types';
import {
  MdDashboard,
  MdMenuBook,
  MdClass,
  MdPeople,
  MdLogout,
} from 'react-icons/md';

export function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  const isProfessor = user?.role === UserRole.PROFESSOR;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>📚 Acadêmico</h2>
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
      </nav>

      <button className="btn btn-logout" onClick={handleLogout}>
        <MdLogout /> Sair
      </button>
    </aside>
  );
}
