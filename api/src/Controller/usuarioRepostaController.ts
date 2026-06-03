import type { Request, Response } from "express";
import { z, ZodError } from "zod";
import { usuarioRespostaService } from "../services/usuarioRespostaService";

const idSchema = z.object({
  id: z.coerce.number().int().positive("ID inválido"),
});

const usuarioQuestaoSchema = z.object({
  usuarioId: z.coerce.number().int().positive("UsuarioId inválido"),
  questaoId: z.coerce.number().int().positive("QuestaoId inválido"),
});

const registroRespostaSchema = z.object({
  usuarioId: z.coerce.number().int().positive("UsuarioId inválido"),
  questaoId: z.coerce.number().int().positive("QuestaoId inválido"),
  respostaQuestaoId: z.coerce.number().int().positive("RespostaQuestaoId inválido"),
  pontuacaoRecebida: z.coerce.number().nonnegative("Pontuação inválida"),
});

const pontuacaoSchema = z.object({
  usuarioId: z.coerce.number().int().positive("UsuarioId inválido"),
  questaoId: z.coerce.number().int().positive("QuestaoId inválido"),
  pontuacao: z.coerce.number().nonnegative("Pontuação inválida"),
});

export class UsuarioRespostaController {
  // =========================
  // LEITURA
  // =========================

  async listarTodos(req: Request, res: Response) {
    try {
      const result = await usuarioRespostaService.listarTodos();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao listar respostas do usuário.",
      });
    }
  }

  async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = idSchema.parse(req.params);

      const result = await usuarioRespostaService.buscarPorId(id);

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

  async buscarPorUsuarioEQuestao(req: Request, res: Response) {
    try {
      const { usuarioId, questaoId } = usuarioQuestaoSchema.parse(
        req.params
      );

      const result =
        await usuarioRespostaService.buscarPorUsuarioEQuestao(
          usuarioId,
          questaoId
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
        message: "Erro ao buscar resposta do usuário.",
      });
    }
  }

  // =========================
  // REGISTRO / UPSERT
  // =========================

  async registrarResposta(req: Request, res: Response) {
    try {
      const data = registroRespostaSchema.parse(req.body);

      const result = await usuarioRespostaService.registrarResposta(data);

      return res.status(201).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Dados inválidos.",
          errors: error.issues,
        });
      }

      return res.status(500).json({
        message: "Erro ao registrar resposta.",
      });
    }
  }

  async atualizarPontuacao(req: Request, res: Response) {
    try {
      const { usuarioId, questaoId, pontuacao } =
        pontuacaoSchema.parse(req.body);

      const result = await usuarioRespostaService.atualizarPontuacao(
        usuarioId,
        questaoId,
        pontuacao
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
        message: "Erro ao atualizar pontuação.",
      });
    }
  }
}

export const usuarioRespostaController = new UsuarioRespostaController();