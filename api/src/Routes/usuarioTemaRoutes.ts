import { Router } from "express";
import { usuarioTemaController } from "../controller/usuarioTemaController";

const router = Router();

/**
 * Listar todos os registros
 * GET /usuario-temas
 */
router.get("/", (req, res) => {
  return usuarioTemaController.listarTodos(req, res);
});

/**
 * Buscar por ID
 * GET /usuario-temas/:id
 */
router.get("/:id", (req, res) => {
  return usuarioTemaController.buscarPorId(req, res);
});

/**
 * Buscar por usuário + tema
 * GET /usuario-temas/usuario/:usuarioId/tema/:temaId
 */
router.get("/usuario/:usuarioId/tema/:temaId", (req, res) => {
  return usuarioTemaController.buscarPorUsuarioETema(req, res);
});

/**
 * Atualizar progresso do tema
 * PUT /usuario-temas/usuario/:usuarioId/tema/:temaId
 */
router.put("/usuario/:usuarioId/tema/:temaId", (req, res) => {
  return usuarioTemaController.atualizarProgresso(req, res);
});

/**
 * Incrementar pontuação
 * POST /usuario-temas/pontuacao
 */
router.post("/pontuacao", (req, res) => {
  return usuarioTemaController.incrementarPontuacao(req, res);
});

/**
 * Incrementar trilhas concluídas
 * POST /usuario-temas/trilhas-concluidas
 */
router.post("/trilhas-concluidas", (req, res) => {
  return usuarioTemaController.incrementarTrilhasConcluidas(req, res);
});

export default router;