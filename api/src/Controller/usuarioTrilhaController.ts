import type { Request, Response } from "express";
import { z, ZodError } from "zod";
import { usuarioTrilhaService } from "../services/usuarioTrilhaService";

const idSchema = z.object({
  id: z.coerce.number().int().positive("ID inválido"),
});

const usuarioTrilhaSchema = z.object({
  usuarioId: z.coerce.number().int().positive("UsuarioId inválido"),
  trilhaId: z.coerce.number().int().positive("TrilhaId inválido"),
});

const statusSchema = z.object({
  usuarioId: z.coerce.number().int().positive("UsuarioId inválido"),
  trilhaId: z.coerce.number().int().positive("TrilhaId inválido"),
  status: z.enum([
    "EM_ANDAMENTO",
    "CONCLUIDA",
    "AGUARDANDO_REVISAO",
    "BLOQUEADA",
  ]),
});

const progressoNumericoSchema = z.object({
  usuarioId: z.coerce.number().int().positive("UsuarioId inválido"),
  trilhaId: z.coerce.number().int().positive("TrilhaId inválido"),
  dados: z.object({
    pontuacaoAtual: z.number().nonnegative().optional(),
    percentualConclusao: z.number().min(0).max(100).optional(),
    moduloAtualId: z.number().int().positive().optional(),
    questaoAtualId: z.number().int().positive().optional(),
    podeDesbloquear: z.boolean().optional(),
    desbloqueadaPorTrilhaId: z.number().int().positive().optional(),
  }),
});

export class UsuarioTrilhaController {
  // =========================
  // LEITURA
  // =========================

  async listarTodos(req: Request, res: Response) {
    try {
      const result = await usuarioTrilhaService.listarTodos();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao listar trilhas do usuário.",
      });
    }
  }

  async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = idSchema.parse(req.params);

      const result = await usuarioTrilhaService.buscarPorId(id);

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

  async buscarPorUsuarioETrilha(req: Request, res: Response) {
    try {
      const { usuarioId, trilhaId } = usuarioTrilhaSchema.parse(req.params);

      const result =
        await usuarioTrilhaService.buscarPorUsuarioETrilha(
          usuarioId,
          trilhaId
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
        message: "Erro ao buscar trilha do usuário.",
      });
    }
  }

  // =========================
  // PROGRESSO
  // =========================

  async atualizarProgresso(req: Request, res: Response) {
    try {
      const { usuarioId, trilhaId } = usuarioTrilhaSchema.parse(req.params);

      const result =
        await usuarioTrilhaService.atualizarProgresso(
          usuarioId,
          trilhaId,
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
        message: "Erro ao atualizar progresso da trilha.",
      });
    }
  }

  async atualizarStatus(req: Request, res: Response) {
    try {
      const { usuarioId, trilhaId, status } = statusSchema.parse(req.body);

      const result =
        await usuarioTrilhaService.atualizarStatus(
          usuarioId,
          trilhaId,
          status
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
        message: "Erro ao atualizar status da trilha.",
      });
    }
  }

  // =========================
  // PROGRESSO NUMÉRICO
  // =========================

  async atualizarProgressoNumerico(req: Request, res: Response) {
    try {
      const { usuarioId, trilhaId, dados } =
        progressoNumericoSchema.parse(req.body);

      const cleanDados = Object.fromEntries(
        Object.entries(dados).filter(([_, value]) => value !== undefined)
      ) as {
        pontuacaoAtual?: number;
        percentualConclusao?: number;
        moduloAtualId?: number;
        questaoAtualId?: number;
        podeDesbloquear?: boolean;
        desbloqueadaPorTrilhaId?: number;
      };

      const result =
        await usuarioTrilhaService.atualizarProgressoNumerico(
          usuarioId,
          trilhaId,
          cleanDados
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
        message: "Erro ao atualizar progresso numérico.",
      });
    }
  }

  // =========================
  // CONCLUSÃO
  // =========================

  async concluirTrilha(req: Request, res: Response) {
    try {
      const { usuarioId, trilhaId } = usuarioTrilhaSchema.parse(req.body);

      const result =
        await usuarioTrilhaService.concluirTrilha(
          usuarioId,
          trilhaId
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
        message: "Erro ao concluir trilha.",
      });
    }
  }
}

export const usuarioTrilhaController = new UsuarioTrilhaController();