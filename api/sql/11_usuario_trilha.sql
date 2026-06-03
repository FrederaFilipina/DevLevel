INSERT INTO trilha_usuario (
    "usuarioId",
    "trilhaId",
    status,
    "pontuacaoAtual",
    "pontuacaoNecessaria",
    "percentualConclusao",
    "podeDesbloquear",
    "moduloAtualId",
    "questaoAtualId",
    "iniciadaEm",
    "concluidaEm"
)
VALUES

-- =========================
-- ANA (INÍCIO DA TRILHA)
-- =========================
(
    1,
    1,
    'EM_ANDAMENTO',
    0,
    1800,
    0,
    false,
    1,
    1,
    NOW(),
    NULL
),

-- =========================
-- BRUNO (METADE DA TRILHA)
-- 9 de 18 questões concluídas
-- =========================
(
    2,
    1,
    'EM_ANDAMENTO',
    900,
    1800,
    50,
    true,
    2,
    10,
    NOW(),
    NULL
),

-- =========================
-- CARLA (TRILHA CONCLUÍDA)
-- 18 de 18 questões concluídas
-- =========================
(
    3,
    1,
    'CONCLUIDA',
    1800,
    1800,
    100,
    true,
    3,
    18,
    NOW(),
    NOW()
);