import { Router } from "express";
import { usuarioRespostaController } from "../controller/usuarioRepostaController";

const router = Router();

/**
 * Listar todas as respostas do usuário
 * GET /usuario-respostas
 */
router.get("/", (req, res) => {
  return usuarioRespostaController.listarTodos(req, res);
});

/**
 * Buscar por ID
 * GET /usuario-respostas/:id
 */
router.get("/:id", (req, res) => {
  return usuarioRespostaController.buscarPorId(req, res);
});

/**
 * Buscar por usuário + questão
 * GET /usuario-respostas/usuario/:usuarioId/questao/:questaoId
 */
router.get(
  "/usuario/:usuarioId/questao/:questaoId",
  (req, res) => {
    return usuarioRespostaController.buscarPorUsuarioEQuestao(req, res);
  }
);

/**
 * Registrar resposta (upsert)
 * POST /usuario-respostas/registrar
 */
router.post("/registrar", (req, res) => {
  return usuarioRespostaController.registrarResposta(req, res);
});

/**
 * Atualizar pontuação
 * PATCH /usuario-respostas/pontuacao
 */
router.patch("/pontuacao", (req, res) => {
  return usuarioRespostaController.atualizarPontuacao(req, res);
});

export default router;