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
  const [semestre, setSemestre] = useState('');
  const [horario, setHorario] = useState('');
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
      await classService.create({ semestre, horario, disciplineId });
      toast.success('Turma criada!');
      setShowModal(false);
      setSemestre('');
      setHorario('');
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
          { key: 'semestre', header: 'Semestre' },
          { key: 'horario', header: 'Horário' },
          {
            key: 'discipline',
            header: 'Disciplina',
            render: (c) => c.discipline?.nome || c.disciplineId,
          },
        ]}
        data={classes}
      />

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Nova Turma">
        <form onSubmit={handleCreate}>
          <Input label="Semestre" value={semestre} onChange={(e) => setSemestre(e.target.value)} placeholder="2026.1" required />
          <Input label="Horário" value={horario} onChange={(e) => setHorario(e.target.value)} placeholder="SEG/QUA 10:00-12:00" required />
          <Input label="ID da Disciplina" value={disciplineId} onChange={(e) => setDisciplineId(e.target.value)} required />
          <Button type="submit">Criar</Button>
        </form>
      </Modal>
    </div>
  );
}
