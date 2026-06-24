import { useEffect, useState } from 'react';
import { classService } from '../services/classService';
import { Table } from '../components/ui/Table';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import type { Class } from '../types';
import toast from 'react-hot-toast';

export function Classes() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [semester, setSemester] = useState('');
  const [schedule, setSchedule] = useState('');
  const [disciplineId, setDisciplineId] = useState('');

  useEffect(() => {
    loadClasses();
  }, []);

  async function loadClasses() {
    try {
      const data = await classService.list();
      setClasses(data);
    } catch {
      toast.error('Erro ao carregar turmas.');
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    try {
      await classService.create({ semester, schedule, disciplineId });
      toast.success('Turma criada!');
      setShowModal(false);
      setSemester('');
      setSchedule('');
      setDisciplineId('');
      loadClasses();
    } catch {
      toast.error('Erro ao criar turma.');
    }
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="page">
      <div className="page-header">
        <h1>Turmas</h1>
        <Button onClick={() => setShowModal(true)}>+ Nova Turma</Button>
      </div>

      <Table
        columns={[
          { key: 'semester', header: 'Semestre' },
          { key: 'schedule', header: 'Horário' },
          {
            key: 'discipline',
            header: 'Disciplina',
            render: (c) => c.discipline?.name || c.disciplineId,
          },
        ]}
        data={classes}
      />

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Nova Turma">
        <form onSubmit={handleCreate}>
          <Input label="Semestre" value={semester} onChange={(e) => setSemester(e.target.value)} placeholder="2026.1" required />
          <Input label="Horário" value={schedule} onChange={(e) => setSchedule(e.target.value)} placeholder="SEG/QUA 10:00-12:00" required />
          <Input label="ID da Disciplina" value={disciplineId} onChange={(e) => setDisciplineId(e.target.value)} required />
          <Button type="submit">Criar</Button>
        </form>
      </Modal>
    </div>
  );
}
