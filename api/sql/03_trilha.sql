INSERT INTO trilha (
  "temaId", titulo, descricao, nivel, ordem, "pontuacaoMinima", "trilhaAnteriorId", "createdAt", "updatedAt"
)
VALUES

-- JavaScript
(1, 'Fundamentos do JavaScript', 'Conceitos básicos da linguagem JavaScript', 'INICIANTE', 1, 0, NULL, NOW(), NOW()),
(1, 'JavaScript Intermediário', 'Estruturas mais avançadas da linguagem', 'INTERMEDIARIO', 2, 100, 1, NOW(), NOW()),
(1, 'JavaScript Avançado', 'Conceitos avançados e padrões de projeto', 'AVANCADO', 3, 250, 2, NOW(), NOW()),

-- TypeScript
(2, 'Fundamentos do TypeScript', 'Introdução ao TypeScript e tipagem básica', 'INICIANTE', 1, 0, NULL, NOW(), NOW()),
(2, 'TypeScript Intermediário', 'Interfaces, generics e tipos avançados', 'INTERMEDIARIO', 2, 120, 4, NOW(), NOW()),
(2, 'TypeScript Avançado', 'Arquitetura e padrões com TypeScript', 'AVANCADO', 3, 300, 5, NOW(), NOW());