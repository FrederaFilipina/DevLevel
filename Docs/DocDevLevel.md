# 📚 Documentação

---
<br>

## 👥 1. Organização do Projeto

### 1.1 Responsabilidade dos membros
- Felipe:
- Frederico:
- Gabriel:
- Gustavo:

### 1.2 Fluxo de Trabalho (Git)
- Branch principal: `main`
- Branch de desenvolvimento: `develop`
- Branches de features:
  - ``
  - ``
  - ``
  - ``

### 1.3 Regras
- Proibido commit direto na main
- Toda feature deve passar por pull request
- Issues obrigatórias para tarefas

---
<br>

## 🏗️ 2. Arquitetura do Sistema

### 2.1 Stack
- Frontend: React + Vite + TailwindCSS
- Backend: Node.js + Express
- Banco de Dados: PostgreSQL + Prisma

### 2.2 Fluxo geral
Frontend → API → Banco de Dados

### 2.3 Responsabilidades
- Frontend: interface e experiência do usuário
- Backend: regras de negócio
- Banco: persistência de dados

---
<br>

## 🧠 3. Regras de Negócio

### 3.1 XP e Níveis
- Usuário ganha XP ao concluir desafios
- XP define nível do usuário
- Níveis desbloqueiam conteúdos

### 3.2 Desafios
- Cada desafio possui XP recompensa
- Pode ter diferentes dificuldades
- Só é concluído ao validar resposta correta

### 3.3 Ranking
- Baseado em XP total
- Atualização dinâmica

### 3.4 Conquistas
- Desbloqueadas por ações específicas
- Podem ser únicas ou progressivas

---
<br>

## 🗄️ 4. Banco de Dados

### 4.1 Entidades

#### Usuário
- id
- nome
- email
- senha
- nivel
- xp

#### Curso
- id
- titulo
- descricao
- dificuldade

#### Desafio
- id
- titulo
- descricao
- xp_recompensa

#### Conquista
- id
- nome
- descricao

#### Progresso
- id
- usuario_id
- curso_id
- porcentagem

### 4.2 Regras
- Padronização de nomes obrigatória
- Relacionamentos documentados no Prisma
- Uso de migrations versionadas

---
<br>

## 🔌 5. Backend (API)

### 5.1 Estrutura
- controllers/
- services/
- routes/
- middlewares/

## 5.2 Autenticação
- JWT obrigatório
- Middleware para rotas protegidas

### 5.3 Principais rotas
- /auth
- /users
- /challenges
- /courses
- /progress

---
<br>

## 🎨 6. Frontend

### 6.1 Estrutura
- components/
- pages/
- services/
- hooks/
- contexts/

### 6.2 Padrões
- Componentização obrigatória
- Uso de TailwindCSS
- Reutilização de componentes

### 6.3 Estado
- Context API ou equivalente
- Separação entre estado global e local

### 6.4 Requisições
- Centralizadas em services/
- Uso de fetch ou axios padronizado

---
<br>

## 🎮 7. Gamificação

### 7.1 XP
- Concedido por desafios concluídos
- Pode variar por dificuldade

### 7.2 Missões
- Diárias ou progressivas
- Recompensas em XP ou conquistas

### 7.3 Conquistas
- Desbloqueadas automaticamente
- Baseadas em comportamento do usuário

---
<br>

## 🔐 8. Segurança
- Senhas com hash (bcrypt)
- Proteção de rotas com JWT
- Validação de inputs
- Sanitização de dados

---
<br>

## 🚀 9. Deploy

### 9.1 Ambiente local
- Variáveis em .env

### 9.2 Produção
- Backend: (definir plataforma)
- Frontend: (definir plataforma)

### 9.3 Variáveis de ambiente
- DATABASE_URL
- JWT_SECRET

---
<br>

## 📦 10. Padrões de Código

### 10.1 Naming
- camelCase: variáveis
- PascalCase: componentes
- kebab-case: URLs

### 10.2 Commits
- feat: nova funcionalidade
- fix: correção de bug
- refactor: melhoria de código
- docs: documentação

---
<br>

## 📊 11. Versionamento
- main → produção
- develop → desenvolvimento
- feature/* → funcionalidades

---