import type { Request, Response } from "express";
import { z, ZodError } from "zod";
import { moduloService } from "../services/moduloService";

const idSchema = z.object({
  id: z.coerce.number().int().positive("ID inválido"),
});

const trilhaIdSchema = z.object({
  trilhaId: z.coerce.number().int().positive("TrilhaId inválido"),
});

const trilhaOrdemSchema = z.object({
  trilhaId: z.coerce.number().int().positive("TrilhaId inválido"),
  ordem: z.coerce.number().int().nonnegative("Ordem inválida"),
});

export class ModuloController {
  async listarTodos(req: Request, res: Response) {
    try {
      const result = await moduloService.listarTodos();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao listar módulos.",
      });
    }
  }

  async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = idSchema.parse(req.params);

      const result = await moduloService.buscarPorId(id);

      if (!result) {
        return res.status(404).json({
          message: "Módulo não encontrado.",
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
        message: "Erro ao buscar módulo por ID.",
      });
    }
  }

  async listarPorTrilha(req: Request, res: Response) {
    try {
      const { trilhaId } = trilhaIdSchema.parse(req.params);

      const result = await moduloService.listarPorTrilha(trilhaId);

      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "TrilhaId inválido.",
          errors: error.issues,
        });
      }

      return res.status(500).json({
        message: "Erro ao listar módulos por trilha.",
      });
    }
  }

  async buscarPorTrilhaEOrdem(req: Request, res: Response) {
    try {
      const { trilhaId, ordem } = trilhaOrdemSchema.parse(req.params);

      const result = await moduloService.buscarPorTrilhaEOrdem(
        trilhaId,
        ordem
      );

      if (!result) {
        return res.status(404).json({
          message: "Módulo não encontrado.",
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
        message: "Erro ao buscar módulo por trilha e ordem.",
      });
    }
  }
}

export const moduloController = new ModuloController();