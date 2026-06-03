INSERT INTO tema_usuario (
  "usuarioId",
  "temaId",
  "pontuacaoTotal",
  "trilhasConcluidas",
  "nivelAtual",
  "createdAt",
  "updatedAt"
)
VALUES

-- Ana
(1, 1, 600, 1, 'INICIANTE', NOW(), NOW()),
(1, 2, 0, 0, 'INICIANTE', NOW(), NOW()),

-- Bruno
(2, 1, 400, 1, 'INICIANTE', NOW(), NOW()),
(2, 2, 0, 0, 'INICIANTE', NOW(), NOW()),

-- Carla
(3, 1, 900, 2, 'AVANCADO', NOW(), NOW()),
(3, 2, 400, 1, 'INTERMEDIARIO', NOW(), NOW());