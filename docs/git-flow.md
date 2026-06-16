# Git Flow

Estratégia de branching adotada no projeto Academic Management Platform.

## Branches principais

| Branch | Propósito |
|--------|-----------|
| `main` | Código estável, pronto para entrega acadêmica. Só recebe merges de `develop` via release. |
| `develop` | Branch de integração. Todo desenvolvimento converge aqui antes de ir para `main`. |

## Branches de trabalho

| Padrão | Uso | Exemplo |
|--------|-----|---------|
| `feature/<descricao>` | Novas funcionalidades | `feature/user-registration` |
| `docs/<descricao>` | Documentação | `docs/git-flow` |
| `fix/<descricao>` | Correções de bugs | `fix/enrollment-validation` |

### Regras de nomeação

- Usar **kebab-case** (letras minúsculas separadas por hífen)
- Ser descritivo e curto: `feature/jwt-auth`, não `feature/implementar-autenticacao-com-jwt-no-servico`
- Prefixo indica o tipo de trabalho

## Fluxo de trabalho

```
main ────────────────────────────── produção
  └── develop ───────────────────── integração
        ├── feature/xxx ──────────── funcionalidades
        ├── docs/xxx ─────────────── documentação
        └── fix/xxx ──────────────── correções
```

### Ciclo de vida de uma branch

1. Criar a branch a partir de `develop`
2. Desenvolver e commitar na branch
3. Abrir PR direcionado para `develop`
4. Aguardar review e aprovação
5. Merge via **squash and merge**
6. Branch é deletada após o merge

## Pull Request flow

1. Todo código entra via **Pull Request** — commits diretos em `main` ou `develop` não são permitidos
2. PRs devem ter como alvo a branch `develop`
3. Pelo menos **1 aprovação** é obrigatória
4. **CI deve passar** antes do merge
5. O PR deve referenciar a issue: `Closes #<número>`
6. Usamos **squash and merge** para manter o histórico limpo

## Convenção de commits

Seguimos o padrão **Conventional Commits**:

```
<tipo>(<escopo>): <descrição>
```

### Tipos

| Tipo | Quando usar |
|------|-------------|
| `feat` | Nova funcionalidade |
| `fix` | Correção de bug |
| `docs` | Documentação |
| `refactor` | Refatoração sem mudança de comportamento |
| `test` | Adição ou atualização de testes |
| `chore` | Tarefas de manutenção |
| `ci` | Mudanças em CI/CD |

### Exemplos

```bash
feat(auth): implement user registration
fix(academic): correct enrollment date validation
docs(git): add git flow documentation
ci(actions): add lint step to pipeline
```
