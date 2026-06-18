import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Dashboard } from '../pages/Dashboard';
import { Disciplines } from '../pages/Disciplines';
import { Classes } from '../pages/Classes';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'disciplines', element: <Disciplines /> },
      { path: 'classes', element: <Classes /> },
      { path: 'enrollments', element: <div className="page"><h1>Matrículas</h1><p>Em breve...</p></div> },
      { path: 'activities', element: <div className="page"><h1>Atividades</h1><p>Em breve...</p></div> },
      { path: 'submissions', element: <div className="page"><h1>Entregas</h1><p>Em breve...</p></div> },
    ],
  },
]);
