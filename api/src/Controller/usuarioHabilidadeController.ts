import type { Request, Response } from "express";
import { z, ZodError } from "zod";
import { usuarioHabilidadeService } from "../services/usuarioHabilidadeService";

const idSchema = z.object({
  id: z.coerce.number().int().positive("ID inválido"),
});

const usuarioHabilidadeSchema = z.object({
  usuarioId: z.coerce.number().int().positive("UsuarioId inválido"),
  habilidadeId: z.coerce.number().int().positive("HabilidadeId inválido"),
});

const incrementoSchema = z.object({
  usuarioId: z.coerce.number().int().positive("UsuarioId inválido"),
  habilidadeId: z.coerce.number().int().positive("HabilidadeId inválido"),
  pontos: z.coerce.number().int().positive("Pontos inválidos"),
});

const nivelSchema = z.object({
  usuarioId: z.coerce.number().int().positive("UsuarioId inválido"),
  habilidadeId: z.coerce.number().int().positive("HabilidadeId inválido"),
  incremento: z.coerce.number().int().positive().optional(),
});

export class UsuarioHabilidadeController {
  // =========================
  // LEITURA
  // =========================

  async listarTodos(req: Request, res: Response) {
    try {
      const result = await usuarioHabilidadeService.listarTodos();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao listar habilidades do usuário.",
      });
    }
  }

  async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = idSchema.parse(req.params);

      const result = await usuarioHabilidadeService.buscarPorId(id);

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

  async buscarPorUsuarioEHabilidade(req: Request, res: Response) {
    try {
      const { usuarioId, habilidadeId } = usuarioHabilidadeSchema.parse(
        req.params
      );

      const result =
        await usuarioHabilidadeService.buscarPorUsuarioEHabilidade(
          usuarioId,
          habilidadeId
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
        message: "Erro ao buscar habilidade do usuário.",
      });
    }
  }

  // =========================
  // PROGRESSO
  // =========================

  async atualizarProgresso(req: Request, res: Response) {
    try {
      const { usuarioId, habilidadeId } = usuarioHabilidadeSchema.parse(
        req.params
      );

      const result =
        await usuarioHabilidadeService.atualizarProgresso(
          usuarioId,
          habilidadeId,
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
        message: "Erro ao atualizar progresso da habilidade.",
      });
    }
  }

  async incrementarPontuacao(req: Request, res: Response) {
    try {
      const { usuarioId, habilidadeId, pontos } = incrementoSchema.parse(
        req.body
      );

      const result =
        await usuarioHabilidadeService.incrementarPontuacao(
          usuarioId,
          habilidadeId,
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

  async subirNivel(req: Request, res: Response) {
    try {
      const { usuarioId, habilidadeId, incremento } = nivelSchema.parse(
        req.body
      );

      const result = await usuarioHabilidadeService.subirNivel(
        usuarioId,
        habilidadeId,
        incremento
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
        message: "Erro ao subir nível da habilidade.",
      });
    }
  }

  async resetarProgresso(req: Request, res: Response) {
    try {
      const { usuarioId, habilidadeId } = usuarioHabilidadeSchema.parse(
        req.params
      );

      const result =
        await usuarioHabilidadeService.resetarProgresso(
          usuarioId,
          habilidadeId
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
        message: "Erro ao resetar progresso da habilidade.",
      });
    }
  }
}

export const usuarioHabilidadeController = new UsuarioHabilidadeController();