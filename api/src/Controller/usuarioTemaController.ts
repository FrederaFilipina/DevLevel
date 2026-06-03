import type { Request, Response } from "express";
import { z, ZodError } from "zod";
import { usuarioTemaService } from "../services/usuarioTemaService";

const idSchema = z.object({
  id: z.coerce.number().int().positive("ID inválido"),
});

const usuarioTemaSchema = z.object({
  usuarioId: z.coerce.number().int().positive("UsuarioId inválido"),
  temaId: z.coerce.number().int().positive("TemaId inválido"),
});

const incrementoSchema = z.object({
  usuarioId: z.coerce.number().int().positive("UsuarioId inválido"),
  temaId: z.coerce.number().int().positive("TemaId inválido"),
  pontos: z.coerce.number().int().positive("Pontos inválidos"),
});

export class UsuarioTemaController {
  // =========================
  // LEITURA
  // =========================

  async listarTodos(req: Request, res: Response) {
    try {
      const result = await usuarioTemaService.listarTodos();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao listar temas do usuário.",
      });
    }
  }

  async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = idSchema.parse(req.params);

      const result = await usuarioTemaService.buscarPorId(id);

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

  async buscarPorUsuarioETema(req: Request, res: Response) {
    try {
      const { usuarioId, temaId } = usuarioTemaSchema.parse(req.params);

      const result =
        await usuarioTemaService.buscarPorUsuarioETema(
          usuarioId,
          temaId
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
        message: "Erro ao buscar tema do usuário.",
      });
    }
  }

  // =========================
  // PROGRESSO DO TEMA
  // =========================

  async atualizarProgresso(req: Request, res: Response) {
    try {
      const { usuarioId, temaId } = usuarioTemaSchema.parse(req.params);

      const result = await usuarioTemaService.atualizarProgresso(
        usuarioId,
        temaId,
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
        message: "Erro ao atualizar progresso do tema.",
      });
    }
  }

  async incrementarPontuacao(req: Request, res: Response) {
    try {
      const { usuarioId, temaId, pontos } = incrementoSchema.parse(
        req.body
      );

      const result =
        await usuarioTemaService.incrementarPontuacao(
          usuarioId,
          temaId,
          pontos
        );

      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Dados inválidos.",
          errors: error.issues,
        });
      }

      return res.status(500).json({
        message: "Erro ao incrementar pontuação.",
      });
    }
  }

  async incrementarTrilhasConcluidas(req: Request, res: Response) {
    try {
      const { usuarioId, temaId } = usuarioTemaSchema.parse(req.body);

      const result =
        await usuarioTemaService.incrementarTrilhasConcluidas(
          usuarioId,
          temaId
        );

      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Dados inválidos.",
          errors: error.issues,
        });
      }

      return res.status(500).json({
        message: "Erro ao atualizar trilhas concluídas.",
      });
    }
  }
}

export const usuarioTemaController = new UsuarioTemaController();