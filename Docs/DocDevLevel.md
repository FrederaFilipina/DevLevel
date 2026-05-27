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

- O usuário deve poder criar uma conta e realizar login.
- Cada usuário possui um perfil único.
- Apenas usuários autenticados podem acessar funcionalidades protegidas.
- O sistema deve registrar o progresso do usuário.
- O usuário pode atualizar informações do próprio perfil.
- Os dados devem ser armazenados de forma segura e consistente.

### 3.2 XP e Níveis

- Usuário ganha XP ao concluir desafios e atividades.
- XP define o nível do usuário.
- Níveis desbloqueiam novos conteúdos e desafios.
- A progressão deve refletir a evolução técnica do usuário.

### 3.3 Desafios

- Cada desafio possui uma recompensa em XP.
- Desafios podem possuir diferentes níveis de dificuldade.
- Um desafio só pode ser concluído após validação correta.
- Os desafios devem incentivar a prática e resolução de problemas reais.


### 3.4 Ranking

- O ranking é baseado no XP total acumulado.
- A atualização do ranking deve ocorrer dinamicamente.
- Usuários com maior desempenho possuem maior posicionamento.


### 3.5 Conquistas

- Conquistas são desbloqueadas por ações específicas.
- Conquistas podem ser únicas ou progressivas.
- O sistema deve registrar conquistas obtidas pelo usuário.


### 3.6 Projetos e Validação de Skills

- O usuário pode desenvolver projetos práticos dentro da plataforma.
- Projetos devem simular experiências reais do mercado de trabalho.
- O sistema deve permitir demonstrar habilidades desenvolvidas.
- A pontuação pode considerar boas práticas e conceitos de Clean Code.
- O progresso do usuário deve servir como validação prática de conhecimento técnico.

---
<br>

## 🗄️ 4. Banco de Dados

### DER - Diagrama Entidade Relacionamento


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