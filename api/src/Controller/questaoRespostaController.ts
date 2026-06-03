import type { Request, Response } from "express";
import { z, ZodError } from "zod";
import { questaoRespostaService } from "../services/questaoRespostaService";

const idSchema = z.object({
  id: z.coerce.number().int().positive("ID inválido"),
});

const questaoIdSchema = z.object({
  questaoId: z.coerce.number().int().positive("QuestaoId inválido"),
});

export class QuestaoRespostaController {
  async listarTodas(req: Request, res: Response) {
    try {
      const result = await questaoRespostaService.listarTodas();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao listar respostas.",
      });
    }
  }

  async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = idSchema.parse(req.params);

      const result = await questaoRespostaService.buscarPorId(id);

      if (!result) {
        return res.status(404).json({
          message: "Resposta não encontrada.",
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
        message: "Erro ao buscar resposta por ID.",
      });
    }
  }

  async listarPorQuestao(req: Request, res: Response) {
    try {
      const { questaoId } = questaoIdSchema.parse(req.params);

      const result = await questaoRespostaService.listarPorQuestao(
        questaoId
      );

      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "QuestaoId inválido.",
          errors: error.issues,
        });
      }

      return res.status(500).json({
        message: "Erro ao listar respostas da questão.",
      });
    }
  }

  async buscarCorretasPorQuestao(req: Request, res: Response) {
    try {
      const { questaoId } = questaoIdSchema.parse(req.params);

      const result =
        await questaoRespostaService.buscarCorretasPorQuestao(questaoId);

      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "QuestaoId inválido.",
          errors: error.issues,
        });
      }

      return res.status(500).json({
        message: "Erro ao buscar respostas corretas.",
      });
    }
  }
}

export const questaoRespostaController = new QuestaoRespostaController();