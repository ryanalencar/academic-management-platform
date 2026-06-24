import { useEffect, useState } from 'react';
import { classService } from '../services/classService';
import { disciplineService } from '../services/disciplineService';
import { enrollmentService } from '../services/enrollmentService';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { UserRole, type Class, type Enrollment } from '../types';
import toast from 'react-hot-toast';

interface StudentGrades {
  studentId: string;
  p1: string;
  p2: string;
  p3: string;
  p4: string;
}

function getStoredGrades(classId: string): Record<string, StudentGrades> {
  const stored = localStorage.getItem(`grades_${classId}`);
  return stored ? JSON.parse(stored) : {};
}

function saveGrades(classId: string, grades: Record<string, StudentGrades>) {
  localStorage.setItem(`grades_${classId}`, JSON.stringify(grades));
}

export function Grades() {
  const { user } = useAuth();
  const [classes, setClasses] = useState<Class[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [grades, setGrades] = useState<Record<string, StudentGrades>>({});
  const [loading, setLoading] = useState(true);

  const isProfessor = user?.type === UserRole.PROFESSOR;

  useEffect(() => {
    loadClasses();
  }, []);

  async function loadClasses() {
    try {
      const [classData, discData] = await Promise.all([
        classService.list(),
        disciplineService.list(),
      ]);
      const enriched = classData.map((c) => ({
        ...c,
        discipline: discData.find((d) => d.id === c.disciplineId),
      }));
      setClasses(enriched);
    } catch {
      toast.error('Erro ao carregar turmas.');
    } finally {
      setLoading(false);
    }
  }

  async function selectClass(classId: string) {
    setSelectedClassId(classId);
    try {
      const data = await enrollmentService.listByClass(classId);
      setEnrollments(data);
      setGrades(getStoredGrades(classId));
    } catch {
      toast.error('Erro ao carregar alunos.');
    }
  }

  function updateGrade(studentId: string, field: 'p1' | 'p2' | 'p3' | 'p4', value: string) {
    setGrades((prev) => {
      const updated = {
        ...prev,
        [studentId]: {
          ...prev[studentId],
          studentId,
          [field]: value,
        },
      };
      saveGrades(selectedClassId, updated);
      return updated;
    });
  }

  function calcAverage(studentId: string): number | null {
    const g = grades[studentId];
    if (!g) return null;
    const values = [g.p1, g.p2, g.p3, g.p4].map(Number).filter((v) => !isNaN(v) && v !== 0);
    if (values.length === 0) return null;
    return values.reduce((a, b) => a + b, 0) / values.length;
  }

  function handleSave() {
    saveGrades(selectedClassId, grades);
    toast.success('Notas salvas!');
  }

  if (loading) return <LoadingSpinner />;

  if (!isProfessor) {
    const studentId = user?.id || '';
    return (
      <div className="page">
        <h1>Minhas Notas</h1>
        <Card>
          {classes.length === 0 ? (
            <p>Nenhuma turma encontrada.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={thStyle}>Disciplina</th>
                  <th style={thStyle}>P1</th>
                  <th style={thStyle}>P2</th>
                  <th style={thStyle}>P3</th>
                  <th style={thStyle}>P4</th>
                  <th style={thStyle}>Média</th>
                  <th style={thStyle}>Situação</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((c) => {
                  const classGrades = getStoredGrades(c.id);
                  const g = classGrades[studentId];
                  const values = g ? [g.p1, g.p2, g.p3, g.p4].map(Number).filter((v) => !isNaN(v) && v !== 0) : [];
                  const avg = values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : null;
                  return (
                    <tr key={c.id}>
                      <td style={tdStyle}>{c.discipline?.name || 'Disciplina'}</td>
                      <td style={tdStyle}>{g?.p1 || '—'}</td>
                      <td style={tdStyle}>{g?.p2 || '—'}</td>
                      <td style={tdStyle}>{g?.p3 || '—'}</td>
                      <td style={tdStyle}>{g?.p4 || '—'}</td>
                      <td style={tdStyle}>{avg !== null ? avg.toFixed(1) : '—'}</td>
                      <td style={tdStyle}>
                        {avg !== null ? (
                          avg >= 5 ? (
                            <span style={{ ...badgeStyle, background: '#10b981' }}>Aprovado</span>
                          ) : (
                            <span style={{ ...badgeStyle, background: '#ef4444' }}>Reprovado</span>
                          )
                        ) : (
                          <span style={{ color: '#9ca3af' }}>Sem notas</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Lançar Notas</h1>

      <Card title="Selecione uma turma">
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
          {classes.map((c) => (
            <Button
              key={c.id}
              variant={selectedClassId === c.id ? 'primary' : 'secondary'}
              onClick={() => selectClass(c.id)}
            >
              {c.discipline?.name || 'Turma'} — {c.semester}
            </Button>
          ))}
        </div>
      </Card>

      {selectedClassId && (
        <Card title="Notas dos Alunos" className="mt-16">
          {enrollments.length === 0 ? (
            <p>Nenhum aluno matriculado nesta turma.</p>
          ) : (
            <>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={thStyle}>Aluno</th>
                    <th style={thStyle}>P1</th>
                    <th style={thStyle}>P2</th>
                    <th style={thStyle}>P3</th>
                    <th style={thStyle}>P4</th>
                    <th style={thStyle}>Média</th>
                    <th style={thStyle}>Situação</th>
                  </tr>
                </thead>
                <tbody>
                  {enrollments.map((e) => {
                    const avg = calcAverage(e.studentId);
                    return (
                      <tr key={e.id}>
                        <td style={tdStyle}>{e.studentId.slice(0, 8)}...</td>
                        {(['p1', 'p2', 'p3', 'p4'] as const).map((field) => (
                          <td key={field} style={tdStyle}>
                            <input
                              type="number"
                              min="0"
                              max="10"
                              step="0.1"
                              value={grades[e.studentId]?.[field] || ''}
                              onChange={(ev) => updateGrade(e.studentId, field, ev.target.value)}
                              style={inputStyle}
                              placeholder="0-10"
                            />
                          </td>
                        ))}
                        <td style={{ ...tdStyle, fontWeight: 700 }}>
                          {avg !== null ? avg.toFixed(1) : '—'}
                        </td>
                        <td style={tdStyle}>
                          {avg !== null ? (
                            avg >= 5 ? (
                              <span style={{ ...badgeStyle, background: '#10b981' }}>Aprovado</span>
                            ) : (
                              <span style={{ ...badgeStyle, background: '#ef4444' }}>Reprovado</span>
                            )
                          ) : (
                            <span style={{ color: '#9ca3af' }}>—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div style={{ marginTop: '16px', textAlign: 'right' }}>
                <Button onClick={handleSave}>Salvar Notas</Button>
              </div>
            </>
          )}
        </Card>
      )}
    </div>
  );
}

const thStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '10px 12px',
  borderBottom: '2px solid #e5e7eb',
  fontSize: '0.8rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  color: '#6b7280',
};

const tdStyle: React.CSSProperties = {
  padding: '10px 12px',
  borderBottom: '1px solid #e5e7eb',
};

const inputStyle: React.CSSProperties = {
  width: '70px',
  padding: '6px 8px',
  border: '1px solid #e5e7eb',
  borderRadius: '6px',
  fontSize: '0.9rem',
  textAlign: 'center',
};

const badgeStyle: React.CSSProperties = {
  padding: '4px 10px',
  borderRadius: '12px',
  fontSize: '0.75rem',
  fontWeight: 600,
  color: '#fff',
};
