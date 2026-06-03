INSERT INTO modulo (
  "trilhaId", titulo, descricao, ordem, "createdAt", "updatedAt"
)
VALUES
(1, 'Variáveis e Tipos', 'Introdução a variáveis e tipos', 1, NOW(), NOW()),
(1, 'Estruturas de Controle', 'Condicionais e loops', 2, NOW(), NOW()),

(2, 'Funções Avançadas', 'Closures e callbacks', 1, NOW(), NOW()),
(2, 'Manipulação de Arrays', 'Métodos avançados', 2, NOW(), NOW()),

(3, 'Assincronismo', 'Promises e async/await', 1, NOW(), NOW()),
(3, 'Arquitetura JS', 'Boas práticas', 2, NOW(), NOW()),

(4, 'Tipos Básicos', 'Tipagem inicial', 1, NOW(), NOW()),
(4, 'Interfaces', 'Uso de interfaces', 2, NOW(), NOW()),

(5, 'Generics', 'Programação genérica', 1, NOW(), NOW()),
(5, 'Utility Types', 'Tipos utilitários', 2, NOW(), NOW()),

(6, 'Arquitetura TS', 'Estrutura de projetos', 1, NOW(), NOW()),
(6, 'Padrões Avançados', 'Design patterns', 2, NOW(), NOW());