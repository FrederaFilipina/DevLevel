INSERT INTO questao (
  "moduloId", titulo, descricao, dificuldade, "xpRecompensa", ordem, "createdAt", "updatedAt"
)
VALUES
(1, 'Variáveis em JS', 'Como declarar variáveis?', 1, 50, 1, NOW(), NOW()),
(1, 'Tipos primitivos', 'Quais são?', 1, 50, 2, NOW(), NOW()),
(1, 'Operadores', 'Operadores básicos', 1, 50, 3, NOW(), NOW()),

(2, 'Condicionais', 'if/else', 2, 70, 1, NOW(), NOW()),
(2, 'Loops', 'for/while', 2, 70, 2, NOW(), NOW()),
(2, 'Switch', 'Uso do switch', 2, 70, 3, NOW(), NOW()),

(3, 'Funções', 'Declaração', 2, 80, 1, NOW(), NOW()),
(3, 'Arrow functions', 'Funções arrow', 2, 80, 2, NOW(), NOW()),
(3, 'Closures', 'Conceito de closure', 2, 80, 3, NOW(), NOW()),

(7, 'Tipagem estática', 'O que é?', 1, 60, 1, NOW(), NOW()),
(7, 'Inferência', 'Como funciona', 1, 60, 2, NOW(), NOW()),
(7, 'Any vs Unknown', 'Diferença', 1, 60, 3, NOW(), NOW()),

(8, 'Interfaces', 'Definição', 2, 80, 1, NOW(), NOW()),
(8, 'Type aliases', 'Uso de type', 2, 80, 2, NOW(), NOW()),
(8, 'Extends', 'Herança', 2, 80, 3, NOW(), NOW()),

(9, 'Generics', 'Uso de generics', 2, 90, 1, NOW(), NOW()),
(9, 'Utility Types', 'Pick/Omit', 2, 90, 2, NOW(), NOW()),
(9, 'Boas práticas', 'Estrutura TS', 2, 90, 3, NOW(), NOW());