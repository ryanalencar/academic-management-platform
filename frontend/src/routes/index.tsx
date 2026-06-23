import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Dashboard } from '../pages/Dashboard';
import { Disciplines } from '../pages/Disciplines';
import { Classes } from '../pages/Classes';
import { Enrollments } from '../pages/Enrollments';
import { Activities } from '../pages/Activities';
import { Submissions } from '../pages/Submissions';

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
      { path: 'enrollments', element: <Enrollments /> },
      { path: 'activities', element: <Activities /> },
      { path: 'submissions', element: <Submissions /> },
    ],
  },
]);
