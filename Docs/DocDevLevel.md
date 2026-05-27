# 📚 Documentação

## Ideia Geral:
Criar uma plataforma onde o usuário possa aprender programação dentro de um recorte específico, seguindo trilhas de aprendizado com dificuldade progressiva conforme o avanço. Para evoluir na trilha, o usuário deverá atingir uma pontuação mínima baseada na qualidade da resposta, considerando critérios como Clean Code e boas práticas de programação.

As questões poderão possuir mais de uma resposta correta, permitindo diferentes abordagens para resolução do problema. Após responder, a aplicação apresentará os pontos positivos e negativos da alternativa escolhida, explicando os critérios utilizados na avaliação.

O usuário só poderá retornar e selecionar outra resposta após concluir a trilha iniciada. Da mesma forma, para desbloquear o próximo nível de dificuldade, será necessário finalizar completamente a trilha atual. A plataforma também permitirá que o usuário inicie múltiplas trilhas simultaneamente, desde que sejam de assuntos diferentes.

O estilo visual da plataforma será inspirado em Cyberpunk, com foco em interfaces simples, diretas e intuitivas. O progresso das questões e das trilhas será exibido por meio de barras de progressão que destacarão visualmente cada avanço alcançado pelo usuário. Ao atingir determinados marcos, a interface apresentará efeitos de destaque para reforçar a sensação de evolução e conquista dentro da plataforma.

↪ Esboço do Frontend: https://stitch.withgoogle.com/projects/7298971410242294980

---
<br>

## 👥 1. Organização do Projeto

### 1.1 Responsabilidade dos membros
- Felipe: Criação do úsuario e autenticação;
- Frederico: Questões, Banco e Repository;
- Gabriel: Service, Controller e Rotas
- Gustavo: Criação de todo o Frontend;

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
- Frontend: React + Vite + JavaScript + TailwindCSS
- Backend: TypeScript + Node + Express + Prisma
- Banco de Dados: Postegre

### 2.2 Fluxo geral
Frontend → API → Banco de Dados

### 2.3 Responsabilidades
- Frontend: interface e experiência do usuário
- Backend: arquitetura de estrutura em camadas e regras de negócio
- Banco: persistência de dados

---
<br>

## 🧠 3. Regras de Negócio

# 📋 Regras de Negócio

### 3.1 Geral
- O usuário deve poder criar uma conta e realizar login;
- Cada usuário possui um perfil único;
- Apenas usuários autenticados podem acessar funcionalidades protegidas;
- O sistema deve registrar o progresso do usuário;
- O usuário pode atualizar informações do próprio perfil;
- Os dados devem ser armazenados de forma segura e consistente;

### 3.2 Trilhas de Aprendizado
- As trilhas devem ser organizadas por assunto e nível de dificuldade;
- O avanço da dificuldade deve ocorrer de forma progressiva;
- O próximo nível da trilha só poderá ser acessado após atingir uma nóta mínima específica;
- O usuário só poderá desbloquear o próximo nível da trilha após concluir completamente a fase atual;
- O progresso da trilha deve ser exibido visualmente ao usuário;

### 3.3 Questões e Respostas
- Cada questão pode possuir uma ou mais respostas corretas;
- O sistema deve aceitar diferentes abordagens para resolução de um mesmo problema;
- O usuário deve receber feedback contendo pontos positivos e negativos da resposta enviada;
- O feedback deve explicar os critérios utilizados na avaliação;
- Uma vez avançado na questão, só será possivel selecionar outra resposta após terminar o nível da trilha e recomeçar;

### 3.4 Avaliação e Pontuação
- A pontuação do usuário deve considerar qualidade da solução apresentada.
- A avaliação deve levar em consideração boas práticas de programação.
- Critérios de Clean Code devem impactar diretamente na pontuação.
- O usuário deve atingir uma pontuação mínima para avançar na trilha.
- O sistema deve registrar o desempenho técnico do usuário ao longo da plataforma.


### 3.5 Progressão e Bloqueios

- O usuário não poderá alterar respostas já enviadas até concluir a trilha atual.
- A progressão para novos níveis depende da conclusão da trilha anterior.
- Conteúdos bloqueados só poderão ser acessados após atingir os requisitos mínimos.
- O sistema deve impedir avanço sem validação da etapa atual.

### 3.6 Gamificação

- O usuário ganha XP ao concluir desafios e trilhas.
- O XP acumulado define o nível do usuário.
- O sistema pode possuir rankings e conquistas baseados em desempenho.
- A progressão deve incentivar evolução técnica contínua.

### 3.7 Validação de Skills

- O progresso do usuário deve servir como demonstração prática de habilidades.
- O sistema deve destacar competências desenvolvidas ao longo das trilhas.
- Projetos e desafios devem simular situações reais do mercado de trabalho.
- O desempenho do usuário deve refletir capacidade técnica prática e não apenas acertos teóricos.

---
<br>

## 🗄️ 4. Banco de Dados

### DER - Diagrama Entidade Relacionamento
# 🗄️ Resumo da Estrutura do Banco de Dados

## 👤 users
- id
- username
- email
- password
- avatar_url
- bio
- xp
- level
- created_at
- updated_at

---

## 📚 subjects
- id
- name
- description
- created_at

---

## 🛤️ learning_tracks
- id
- subject_id
- title
- description
- difficulty_level
- minimum_score
- order_index
- is_locked
- created_at

---

## 📖 modules
- id
- track_id
- title
- description
- order_index
- created_at

---

## ❓ questions
- id
- module_id
- title
- description
- difficulty
- xp_reward
- minimum_score
- order_index
- created_at

---

## 🧩 answers
- id
- question_id
- answer_content
- is_correct
- clean_code_score
- performance_score
- readability_score
- created_at

---

## 📝 user_answers
- id
- user_id
- question_id
- answer_id
- final_score
- positive_feedback
- negative_feedback
- is_completed
- answered_at

---

## 📈 user_track_progress
- id
- user_id
- track_id
- current_module_id
- current_question_id
- progress_percentage
- is_completed
- started_at
- completed_at

## 🔒 user_track_locks
- id
- user_id
- track_id
- is_unlocked
- unlocked_at

## 🏆 achievements
- id
- title
- description
- icon
- xp_reward
- created_at

## 🎖️ user_achievements
- id
- user_id
- achievement_id
- unlocked_at

## 📊 rankings
- id
- user_id
- total_xp
- position
- updated_at

## 🧠 skills
- id
- name
- description

## 📌 user_skills
- id
- user_id
- skill_id
- score
- level
- updated_at

## 🎯 evaluation_criteria
- id
- name
- description
- weight

## 📋 answer_evaluations
- id
- user_answer_id
- criteria_id
- score
- feedback

---
<br>

## 🔌 5. Backend (API)

### 5.1 Estrutura
- routes/
- middlewares/
- controllers/
- services/
- repositories/

## 5.2 Autenticação
- JWT obrigatório
- Hash para cripitografar as senhas
- Middleware para rotas protegidas

### 5.3 Principais rotas
- /auth
- /users
- / [preenncher conforme necessidade]

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

### Ver como vai ficar!

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

## 📊 10. Versionamento
- main → produção
- develop → desenvolvimento
- feature/* → funcionalidades

---