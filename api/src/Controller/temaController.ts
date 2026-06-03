import type { Request, Response } from "express";
import { z, ZodError } from "zod";
import { temaService } from "../services/temaService";

const idSchema = z.object({
  id: z.coerce.number().int().positive("ID inválido"),
});

const nomeSchema = z.object({
  nome: z.string().min(1, "Nome inválido"),
});

export class TemaController {
  async listarTodos(req: Request, res: Response) {
    try {
      const result = await temaService.listarTodos();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao listar temas.",
      });
    }
  }

  async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = idSchema.parse(req.params);

      const result = await temaService.buscarPorId(id);

      if (!result) {
        return res.status(404).json({
          message: "Tema não encontrado.",
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
        message: "Erro ao buscar tema por ID.",
      });
    }
  }

  async buscarPorNome(req: Request, res: Response) {
    try {
      const { nome } = nomeSchema.parse(req.params);

      const result = await temaService.buscarPorNome(nome);

      if (!result) {
        return res.status(404).json({
          message: "Tema não encontrado.",
        });
      }

      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Nome inválido.",
          errors: error.issues,
        });
      }

      return res.status(500).json({
        message: "Erro ao buscar tema por nome.",
      });
    }
  }
}

export const temaController = new TemaController();