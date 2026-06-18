import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import toast from 'react-hot-toast';

type Role = 'student' | 'professor';

export function Register() {
  const [role, setRole] = useState<Role>('student');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [matricula, setMatricula] = useState('');
  const [curso, setCurso] = useState('');
  const [siape, setSiape] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [loading, setLoading] = useState(false);

  const { registerStudent, registerProfessor } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (role === 'student') {
        await registerStudent({ nome, email, senha, matricula, curso });
      } else {
        await registerProfessor({ nome, email, senha, siape, departamento });
      }
      toast.success('Cadastro realizado com sucesso!');
      navigate('/');
    } catch {
      toast.error('Erro ao realizar cadastro. Verifique os dados.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>📚 Criar Conta</h1>

        <div className="role-toggle">
          <button
            className={role === 'student' ? 'active' : ''}
            onClick={() => setRole('student')}
            type="button"
          >
            Aluno
          </button>
          <button
            className={role === 'professor' ? 'active' : ''}
            onClick={() => setRole('professor')}
            type="button"
          >
            Professor
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <Input label="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input label="Senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />

          {role === 'student' ? (
            <>
              <Input label="Matrícula" value={matricula} onChange={(e) => setMatricula(e.target.value)} required />
              <Input label="Curso" value={curso} onChange={(e) => setCurso(e.target.value)} required />
            </>
          ) : (
            <>
              <Input label="SIAPE" value={siape} onChange={(e) => setSiape(e.target.value)} required />
              <Input label="Departamento" value={departamento} onChange={(e) => setDepartamento(e.target.value)} required />
            </>
          )}

          <Button type="submit" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </Button>
        </form>

        <p className="auth-link">
          Já tem conta? <Link to="/login">Faça login</Link>
        </p>
      </div>
    </div>
  );
}
