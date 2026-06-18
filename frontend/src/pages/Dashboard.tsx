import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types';
import { Card } from '../components/ui/Card';
import { MdMenuBook, MdClass, MdPeople, MdAssignment } from 'react-icons/md';

export function Dashboard() {
  const { user } = useAuth();
  const isProfessor = user?.tipo === UserRole.PROFESSOR;

  return (
    <div className="page">
      <h1>Bem-vindo, {user?.nome}!</h1>
      <p className="subtitle">
        {isProfessor
          ? 'Painel do Professor — gerencie suas disciplinas, turmas e atividades.'
          : 'Painel do Aluno — acompanhe suas matrículas, atividades e notas.'}
      </p>

      <div className="dashboard-grid">
        {isProfessor ? (
          <>
            <Card title="Disciplinas" className="dashboard-card">
              <MdMenuBook size={32} />
              <p>Gerencie suas disciplinas e conteúdos.</p>
            </Card>
            <Card title="Turmas" className="dashboard-card">
              <MdClass size={32} />
              <p>Veja suas turmas e alunos matriculados.</p>
            </Card>
            <Card title="Matrículas Pendentes" className="dashboard-card">
              <MdPeople size={32} />
              <p>Aprove ou rejeite solicitações de matrícula.</p>
            </Card>
            <Card title="Atividades" className="dashboard-card">
              <MdAssignment size={32} />
              <p>Crie e corrija atividades das suas turmas.</p>
            </Card>
          </>
        ) : (
          <>
            <Card title="Minhas Turmas" className="dashboard-card">
              <MdClass size={32} />
              <p>Veja as turmas em que você está matriculado.</p>
            </Card>
            <Card title="Atividades" className="dashboard-card">
              <MdAssignment size={32} />
              <p>Confira atividades pendentes e prazos.</p>
            </Card>
            <Card title="Minhas Notas" className="dashboard-card">
              <MdMenuBook size={32} />
              <p>Acompanhe suas notas e entregas.</p>
            </Card>
            <Card title="Nova Matrícula" className="dashboard-card">
              <MdPeople size={32} />
              <p>Matricule-se em novas turmas disponíveis.</p>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
