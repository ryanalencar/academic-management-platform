import { useEffect, useState } from 'react';
import { enrollmentService } from '../services/enrollmentService';
import { classService } from '../services/classService';
import { useAuth } from '../hooks/useAuth';
import { Table } from '../components/ui/Table';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Card } from '../components/ui/Card';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { UserRole, EnrollmentStatus, type Enrollment, type Class } from '../types';
import toast from 'react-hot-toast';

export function Enrollments() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState('');

  const isProfessor = user?.tipo === UserRole.PROFESSOR;

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [enrollmentData, classData] = await Promise.all([
        enrollmentService.list(),
        classService.list(),
      ]);
      setEnrollments(enrollmentData);
      setClasses(classData);
    } catch {
      toast.error('Erro ao carregar dados.');
    } finally {
      setLoading(false);
    }
  }

  async function handleEnroll(e: React.FormEvent) {
    e.preventDefault();
    try {
      await enrollmentService.create({ classId: selectedClassId });
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
      loadData();
    } catch {
      toast.error('Erro ao atualizar matrícula.');
    }
  }

  function statusBadge(status: EnrollmentStatus) {
    const colors: Record<EnrollmentStatus, string> = {
      [EnrollmentStatus.PENDING]: '#f59e0b',
      [EnrollmentStatus.APPROVED]: '#10b981',
      [EnrollmentStatus.CANCELLED]: '#ef4444',
    };
    const labels: Record<EnrollmentStatus, string> = {
      [EnrollmentStatus.PENDING]: 'Pendente',
      [EnrollmentStatus.APPROVED]: 'Aprovada',
      [EnrollmentStatus.CANCELLED]: 'Cancelada',
    };
    return (
      <span style={{
        padding: '4px 10px',
        borderRadius: '12px',
        fontSize: '0.75rem',
        fontWeight: 600,
        color: '#fff',
        background: colors[status],
      }}>
        {labels[status]}
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

      {isProfessor ? (
        <Card>
          <Table
            columns={[
              { key: 'studentId', header: 'Aluno' },
              { key: 'classId', header: 'Turma' },
              { key: 'data', header: 'Data', render: (e) => new Date(e.data).toLocaleDateString('pt-BR') },
              { key: 'status', header: 'Status', render: (e) => statusBadge(e.status) },
              {
                key: 'actions',
                header: 'Ações',
                render: (e) =>
                  e.status === EnrollmentStatus.PENDING ? (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Button variant="primary" onClick={() => handleUpdateStatus(e.id, 'APPROVED')}>
                        Aprovar
                      </Button>
                      <Button variant="danger" onClick={() => handleUpdateStatus(e.id, 'CANCELLED')}>
                        Rejeitar
                      </Button>
                    </div>
                  ) : null,
              },
            ]}
            data={enrollments}
            emptyMessage="Nenhuma matrícula encontrada."
          />
        </Card>
      ) : (
        <Card>
          <Table
            columns={[
              { key: 'classId', header: 'Turma' },
              { key: 'data', header: 'Data', render: (e) => new Date(e.data).toLocaleDateString('pt-BR') },
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
                  {c.discipline?.nome || 'Disciplina'} — {c.semestre} ({c.horario})
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
