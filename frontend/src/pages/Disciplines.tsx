import { useEffect, useState } from 'react';
import { disciplineService } from '../services/disciplineService';
import { useAuth } from '../hooks/useAuth';
import { Table } from '../components/ui/Table';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import type { Discipline } from '../types';
import toast from 'react-hot-toast';

export function Disciplines() {
  const { user } = useAuth();
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [workload, setWorkload] = useState('');

  useEffect(() => {
    loadDisciplines();
  }, []);

  async function loadDisciplines() {
    try {
      const data = await disciplineService.list();
      setDisciplines(data);
    } catch {
      toast.error('Erro ao carregar disciplinas.');
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    try {
      await disciplineService.create({
        name,
        code,
        workload: Number(workload),
        professorId: user?.id,
      });
      toast.success('Disciplina criada!');
      setShowModal(false);
      setName('');
      setCode('');
      setWorkload('');
      loadDisciplines();
    } catch {
      toast.error('Erro ao criar disciplina.');
    }
  }

  if (loading) return <LoadingSpinner />;

  return (
    <div className="page">
      <div className="page-header">
        <h1>Disciplinas</h1>
        <Button onClick={() => setShowModal(true)}>+ Nova Disciplina</Button>
      </div>

      <Table
        columns={[
          { key: 'code', header: 'Código' },
          { key: 'name', header: 'Nome' },
          { key: 'workload', header: 'Carga Horária' },
        ]}
        data={disciplines}
      />

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Nova Disciplina">
        <form onSubmit={handleCreate}>
          <Input label="Nome" value={name} onChange={(e) => setName(e.target.value)} required />
          <Input label="Código" value={code} onChange={(e) => setCode(e.target.value)} placeholder="CMP1234" required />
          <Input label="Carga Horária" type="number" value={workload} onChange={(e) => setWorkload(e.target.value)} required />
          <Button type="submit">Criar</Button>
        </form>
      </Modal>
    </div>
  );
}
