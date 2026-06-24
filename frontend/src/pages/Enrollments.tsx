import { useEffect, useState } from 'react';
import { enrollmentService } from '../services/enrollmentService';
import { classService } from '../services/classService';
import { useAuth } from '../hooks/useAuth';
import { Table } from '../components/ui/Table';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Card } from '../components/ui/Card';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { UserRole, type Enrollment, type Class } from '../types';
import toast from 'react-hot-toast';

export function Enrollments() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [professorClassId, setProfessorClassId] = useState('');

  const isProfessor = user?.type === UserRole.PROFESSOR;

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const classData = await classService.list();
      setClasses(classData);

      if (user?.id && !isProfessor) {
        const enrollmentData = await enrollmentService.listByStudent(user.id);
        setEnrollments(enrollmentData);
      }
    } catch {
      toast.error('Erro ao carregar dados.');
    } finally {
      setLoading(false);
    }
  }

  async function loadClassEnrollments(classId: string) {
    setProfessorClassId(classId);
    try {
      const data = await enrollmentService.listByClass(classId);
      setEnrollments(data);
    } catch {
      toast.error('Erro ao carregar matrículas da turma.');
    }
  }

  async function handleEnroll(e: React.FormEvent) {
    e.preventDefault();
    if (!user?.id) return;
    try {
      await enrollmentService.create({ classId: selectedClassId, studentId: user.id });
      toast.success('Matrícula solicitada!');
      setShowModal(false);
      setSelectedClassId('');
      loadData();
    } catch {
      toast.error('Erro ao solicitar matrícula.');
    }
  }

  async function handleUpdateStatus(id: string, status: string) {
    try {
      await enrollmentService.updateStatus(id, status);
      toast.success(`Matrícula ${status === 'APPROVED' ? 'aprovada' : 'cancelada'}!`);
      if (professorClassId) {
        loadClassEnrollments(professorClassId);
      }
    } catch {
      toast.error('Erro ao atualizar matrícula.');
    }
  }

  function statusBadge(status: string) {
    const colors: Record<string, string> = {
      ACTIVE: '#10b981',
      PENDING: '#f59e0b',
      APPROVED: '#10b981',
      CANCELLED: '#ef4444',
    };
    const labels: Record<string, string> = {
      ACTIVE: 'Ativa',
      PENDING: 'Pendente',
      APPROVED: 'Aprovada',
      CANCELLED: 'Cancelada',
    };
    return (
      <span style={{
        padding: '4px 10px',
        borderRadius: '12px',
        fontSize: '0.75rem',
        fontWeight: 600,
        color: '#fff',
        background: colors[status] || '#9ca3af',
      }}>
        {labels[status] || status}
      </span>
    );
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="page">
      <div className="page-header">
        <h1>{isProfessor ? 'Gerenciar Matrículas' : 'Minhas Matrículas'}</h1>
        {!isProfessor && (
          <Button onClick={() => setShowModal(true)}>+ Nova Matrícula</Button>
        )}
      </div>

      {isProfessor && (
        <>
          <Card title="Selecione uma turma">
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
              {classes.map((c) => (
                <Button
                  key={c.id}
                  variant={professorClassId === c.id ? 'primary' : 'secondary'}
                  onClick={() => loadClassEnrollments(c.id)}
                >
                  {c.discipline?.name || 'Turma'} — {c.semester}
                </Button>
              ))}
              {classes.length === 0 && <p>Nenhuma turma cadastrada.</p>}
            </div>
          </Card>

          {professorClassId && (
            <Card title="Alunos Matriculados" className="mt-16">
              <Table
                columns={[
                  { key: 'studentId', header: 'ID do Aluno' },
                  { key: 'status', header: 'Status', render: (e) => statusBadge(e.status) },
                  {
                    key: 'actions',
                    header: 'Ações',
                    render: (e) => (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {e.status !== 'CANCELLED' && (
                          <Button variant="danger" onClick={() => handleUpdateStatus(e.id, 'CANCELLED')}>
                            Cancelar
                          </Button>
                        )}
                        {e.status === 'CANCELLED' && (
                          <Button variant="primary" onClick={() => handleUpdateStatus(e.id, 'ACTIVE')}>
                            Reativar
                          </Button>
                        )}
                      </div>
                    ),
                  },
                ]}
                data={enrollments}
                emptyMessage="Nenhum aluno matriculado nesta turma."
              />
            </Card>
          )}
        </>
      )}

      {!isProfessor && (
        <Card>
          <Table
            columns={[
              { key: 'classId', header: 'Turma' },
              { key: 'status', header: 'Status', render: (e) => statusBadge(e.status) },
            ]}
            data={enrollments}
            emptyMessage="Você ainda não possui matrículas."
          />
        </Card>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Nova Matrícula">
        <form onSubmit={handleEnroll}>
          <div className="form-field">
            <label>Selecione a Turma</label>
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              required
            >
              <option value="">Selecione...</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.discipline?.name || 'Disciplina'} — {c.semester} ({c.schedule})
                </option>
              ))}
            </select>
          </div>
          <Button type="submit">Solicitar Matrícula</Button>
        </form>
      </Modal>
    </div>
  );
}
