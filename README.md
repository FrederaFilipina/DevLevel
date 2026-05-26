# 🚀 Pojeto: DevLevel

## 📖 Sobre o Projeto

O `DevLevel` é uma plataforma gamificada de aprendizado de programação focada no desenvolvimento de conhecimento prático, habilidades técnicas e preparação para o mercado de trabalho.

A proposta do projeto é unir gamificação, desafios interativos e projetos reais para tornar o aprendizado de programação mais envolvente, eficiente e aplicado ao contexto profissional.

---

# 🎯 Problema / Desafio Abordado

Muitas plataformas de ensino de programação conseguem engajar usuários por meio da gamificação, porém falham em transformar o aprendizado em experiências práticas reais e em validar de forma clara as habilidades desenvolvidas para o mercado de trabalho.

O `DevLevel` busca resolver esse problema oferecendo:
- trilhas de aprendizado estruturadas;
- aprendizado gamificado;
- desafios práticos;
- desenvolvimento de projetos reais;
- pontuação baseada em boas práticas e Clean Code;
- progressão técnica por níveis.


---

# 👨‍💻 Integrantes da Equipe

- Felipe
- Frederico
- Gabriel
- Gustavo

---

# 🛠️ Tecnologias Utilizadas

### Frontend
- React
- Vite
- TailwindCSS

### Backend
- Node.js
- Express

### Banco de Dados
- PostgreSQL
- Prisma ORM

### Outras Ferramentas
- Git
- GitHub
- Figma
- Insomnia/Postman

---

# ✨ Funcionalidades Implementadas

- ✅ Sistema de cadastro e login
- ✅ Perfil do usuário
- ✅ Dashboard de progresso

- ✅ Sistema de níveis e XP
- ✅ Trilhas de aprendizado
- ✅ Desafios de programação
- ✅ Sistema de conquistas
- ✅ Ranking de usuários

---

# 🗄️ Estrutura do Banco de Dados

## Entidades principais

### Usuário
- id
- nome
- email
- senha
- nível
- xp

### Curso
- id
- título
- descrição
- dificuldade

### Desafio
- id
- título
- descrição
- xp_recompensa

### Conquista
- id
- nome
- descrição

### Progresso
- id
- usuário_id
- curso_id
- porcentagem

---

# 💰 Modelo de Monetização

O DevLevel utilizará um modelo de monetização baseado em anúncios segmentados, exibindo conteúdos relevantes de acordo com os interesses e perfil de aprendizado dos usuários.

Os anúncios poderão ser relacionados a:
- cursos de tecnologia;
- vagas de estágio e emprego;
- eventos da área de TI;
- ferramentas para desenvolvedores;
- plataformas educacionais;
- produtos tecnológicos.

Esse modelo permite manter a plataforma acessível gratuitamente, ao mesmo tempo em que gera receita para manutenção e evolução do sistema.

---

# ▶️ Instruções para Execução Local

## Clone o repositório

```bash
git clone https://github.com/seu-usuario/devlevel.git