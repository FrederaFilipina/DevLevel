import { Router } from "express";
import { usuarioConquistaController } from "../controller/usuarioConquistaController";

const router = Router();

/**
 * Listar todos os registros
 * GET /usuario-conquistas
 */
router.get("/", (req, res) => {
  return usuarioConquistaController.listarTodos(req, res);
});

/**
 * Buscar por ID do registro
 * GET /usuario-conquistas/:id
 */
router.get("/:id", (req, res) => {
  return usuarioConquistaController.buscarPorId(req, res);
});

/**
 * Buscar por usuário + conquista
 * GET /usuario-conquistas/usuario/:usuarioId/conquista/:conquistaId
 */
router.get("/usuario/:usuarioId/conquista/:conquistaId", (req, res) => {
  return usuarioConquistaController.buscarPorUsuarioEConquista(req, res);
});

/**
 * Verificar se conquista está desbloqueada
 * GET /usuario-conquistas/usuario/:usuarioId/conquista/:conquistaId/desbloqueada
 */
router.get(
  "/usuario/:usuarioId/conquista/:conquistaId/desbloqueada",
  (req, res) => {
    return usuarioConquistaController.verificarSeDesbloqueada(req, res);
  }
);

/**
 * Desbloquear conquista (criação de registro)
 * POST /usuario-conquistas/desbloquear
 */
router.post("/desbloquear", (req, res) => {
  return usuarioConquistaController.desbloquearConquista(req, res);
});

/**
 * Atualizar desbloqueio
 * PUT /usuario-conquistas/usuario/:usuarioId/conquista/:conquistaId
 */
router.put(
  "/usuario/:usuarioId/conquista/:conquistaId",
  (req, res) => {
    return usuarioConquistaController.atualizarDesbloqueio(req, res);
  }
);

export default router;