import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { disciplineService } from '../services/disciplineService';
import { Table } from '../components/ui/Table';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import type { Discipline } from '../types';
import toast from 'react-hot-toast';

export function Disciplines() {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [nome, setNome] = useState('');
  const [codigo, setCodigo] = useState('');
  const [cargaHoraria, setCargaHoraria] = useState('');
  const navigate = useNavigate();

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
        nome,
        codigo,
        cargaHoraria: Number(cargaHoraria),
      });
      toast.success('Disciplina criada!');
      setShowModal(false);
      setNome('');
      setCodigo('');
      setCargaHoraria('');
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
          { key: 'codigo', header: 'Código' },
          { key: 'nome', header: 'Nome' },
          { key: 'cargaHoraria', header: 'Carga Horária' },
        ]}
        data={disciplines}
        onRowClick={(d) => navigate(`/disciplines/${d.id}`)}
      />

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Nova Disciplina">
        <form onSubmit={handleCreate}>
          <Input label="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
          <Input label="Código" value={codigo} onChange={(e) => setCodigo(e.target.value)} required />
          <Input label="Carga Horária" type="number" value={cargaHoraria} onChange={(e) => setCargaHoraria(e.target.value)} required />
          <Button type="submit">Criar</Button>
        </form>
      </Modal>
    </div>
  );
}
