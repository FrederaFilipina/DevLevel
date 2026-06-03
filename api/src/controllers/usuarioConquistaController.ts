import type { Request, Response } from "express";
import { z, ZodError } from "zod";
import { usuarioConquistaService } from "../services/usuarioConquistaService";

const idSchema = z.object({
  id: z.coerce.number().int().positive("ID inválido"),
});

const usuarioConquistaSchema = z.object({
  usuarioId: z.coerce.number().int().positive("UsuarioId inválido"),
  conquistaId: z.coerce.number().int().positive("ConquistaId inválido"),
});

export class UsuarioConquistaController {
  // =========================
  // LEITURA
  // =========================

  async listarTodos(req: Request, res: Response) {
    try {
      const result = await usuarioConquistaService.listarTodos();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao listar conquistas do usuário.",
      });
    }
  }

  async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = idSchema.parse(req.params);

      const result = await usuarioConquistaService.buscarPorId(id);

      if (!result) {
        return res.status(404).json({
          message: "Registro não encontrado.",
        });
      }

      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "ID inválido.",
          errors: error.issues,
        });
      }

      return res.status(500).json({
        message: "Erro ao buscar registro.",
      });
    }
  }

  async buscarPorUsuarioEConquista(req: Request, res: Response) {
    try {
      const { usuarioId, conquistaId } = usuarioConquistaSchema.parse(
        req.params
      );

      const result =
        await usuarioConquistaService.buscarPorUsuarioEConquista(
          usuarioId,
          conquistaId
        );

      if (!result) {
        return res.status(404).json({
          message: "Registro não encontrado.",
        });
      }

      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Parâmetros inválidos.",
          errors: error.issues,
        });
      }

      return res.status(500).json({
        message: "Erro ao buscar conquista do usuário.",
      });
    }
  }

  // =========================
  // DESBLOQUEIO / UPDATE
  // =========================

  async desbloquearConquista(req: Request, res: Response) {
    try {
      const { usuarioId, conquistaId } = usuarioConquistaSchema.parse(
        req.body
      );

      const result =
        await usuarioConquistaService.desbloquearConquista(
          usuarioId,
          conquistaId
        );

      return res.status(201).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Dados inválidos.",
          errors: error.issues,
        });
      }

      return res.status(500).json({
        message: "Erro ao desbloquear conquista.",
      });
    }
  }

  async atualizarDesbloqueio(req: Request, res: Response) {
    try {
      const { usuarioId, conquistaId } = usuarioConquistaSchema.parse(
        req.params
      );

      const result =
        await usuarioConquistaService.atualizarDesbloqueio(
          usuarioId,
          conquistaId,
          req.body
        );

      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Parâmetros inválidos.",
          errors: error.issues,
        });
      }

      return res.status(500).json({
        message: "Erro ao atualizar conquista do usuário.",
      });
    }
  }

  async verificarSeDesbloqueada(req: Request, res: Response) {
    try {
      const { usuarioId, conquistaId } = usuarioConquistaSchema.parse(
        req.params
      );

      const result =
        await usuarioConquistaService.verificarSeDesbloqueada(
          usuarioId,
          conquistaId
        );

      return res.status(200).json({
        usuarioId,
        conquistaId,
        desbloqueada: result,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Parâmetros inválidos.",
          errors: error.issues,
        });
      }

      return res.status(500).json({
        message: "Erro ao verificar conquista.",
      });
    }
  }
}

export const usuarioConquistaController = new UsuarioConquistaController();