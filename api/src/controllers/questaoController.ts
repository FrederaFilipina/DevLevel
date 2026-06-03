import type { Request, Response } from "express";
import { z, ZodError } from "zod";
import { questaoService } from "../services/questaoService";

const idSchema = z.object({
  id: z.coerce.number().int().positive("ID inválido"),
});

const moduloIdSchema = z.object({
  moduloId: z.coerce.number().int().positive("ModuloId inválido"),
});

const moduloOrdemSchema = z.object({
  moduloId: z.coerce.number().int().positive("ModuloId inválido"),
  ordem: z.coerce.number().int().nonnegative("Ordem inválida"),
});

export class QuestaoController {
  async listarTodas(req: Request, res: Response) {
    try {
      const result = await questaoService.listarTodas();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao listar questões.",
      });
    }
  }

  async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = idSchema.parse(req.params);

      const result = await questaoService.buscarPorId(id);

      if (!result) {
        return res.status(404).json({
          message: "Questão não encontrada.",
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
        message: "Erro ao buscar questão por ID.",
      });
    }
  }

  async listarPorModulo(req: Request, res: Response) {
    try {
      const { moduloId } = moduloIdSchema.parse(req.params);

      const result = await questaoService.listarPorModulo(moduloId);

      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "ModuloId inválido.",
          errors: error.issues,
        });
      }

      return res.status(500).json({
        message: "Erro ao listar questões por módulo.",
      });
    }
  }

  async buscarPorModuloEOrdem(req: Request, res: Response) {
    try {
      const { moduloId, ordem } = moduloOrdemSchema.parse(req.params);

      const result = await questaoService.buscarPorModuloEOrdem(
        moduloId,
        ordem
      );

      if (!result) {
        return res.status(404).json({
          message: "Questão não encontrada.",
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
        message: "Erro ao buscar questão por módulo e ordem.",
      });
    }
  }
}

export const questaoController = new QuestaoController();