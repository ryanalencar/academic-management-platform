import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types';
import { Card } from '../components/ui/Card';
import { MdMenuBook, MdClass, MdPeople, MdAssignment } from 'react-icons/md';

export function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isProfessor = user?.type === UserRole.PROFESSOR;

  return (
    <div className="page">
      <h1>Bem-vindo, {user?.name}!</h1>
      <p className="subtitle">
        {isProfessor
          ? 'Painel do Professor — gerencie suas disciplinas, turmas e atividades.'
          : 'Painel do Aluno — acompanhe suas matrículas, atividades e notas.'}
      </p>

      <div className="dashboard-grid">
        {isProfessor ? (
          <>
            <Card title="Disciplinas" className="dashboard-card">
              <div onClick={() => navigate('/disciplines')} style={{ cursor: 'pointer' }}>
                <MdMenuBook size={32} />
                <p>Gerencie suas disciplinas e conteúdos.</p>
              </div>
            </Card>
            <Card title="Turmas" className="dashboard-card">
              <div onClick={() => navigate('/classes')} style={{ cursor: 'pointer' }}>
                <MdClass size={32} />
                <p>Veja suas turmas e alunos matriculados.</p>
              </div>
            </Card>
            <Card title="Matrículas Pendentes" className="dashboard-card">
              <div onClick={() => navigate('/enrollments')} style={{ cursor: 'pointer' }}>
                <MdPeople size={32} />
                <p>Aprove ou rejeite solicitações de matrícula.</p>
              </div>
            </Card>
          </>
        ) : (
          <>
            <Card title="Disciplinas" className="dashboard-card">
              <div onClick={() => navigate('/disciplines')} style={{ cursor: 'pointer' }}>
                <MdMenuBook size={32} />
                <p>Veja as disciplinas disponíveis.</p>
              </div>
            </Card>
            <Card title="Turmas" className="dashboard-card">
              <div onClick={() => navigate('/classes')} style={{ cursor: 'pointer' }}>
                <MdClass size={32} />
                <p>Veja as turmas disponíveis.</p>
              </div>
            </Card>
            <Card title="Matrículas" className="dashboard-card">
              <div onClick={() => navigate('/enrollments')} style={{ cursor: 'pointer' }}>
                <MdPeople size={32} />
                <p>Solicite matrícula em turmas.</p>
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
