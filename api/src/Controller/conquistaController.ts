import type { Request, Response } from "express";
import { z, ZodError } from "zod";
import { conquistaService } from "../services/conquistaService";

const idSchema = z.object({
  id: z.coerce.number().int().positive("ID inválido"),
});

const tituloSchema = z.object({
  titulo: z.string().min(1, "Título inválido"),
});

export class ConquistaController {
  async listarTodas(req: Request, res: Response) {
    try {
      const result = await conquistaService.listarTodas();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao listar conquistas.",
      });
    }
  }

  async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = idSchema.parse(req.params);

      const result = await conquistaService.buscarPorId(id);

      if (!result) {
        return res.status(404).json({
          message: "Conquista não encontrada.",
        });
      }

      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "ID inválido.",
          errors: error.issues, // ← correção aqui
        });
      }

      return res.status(500).json({
        message: "Erro ao buscar conquista por ID.",
      });
    }
  }

  async buscarPorTitulo(req: Request, res: Response) {
    try {
      const { titulo } = tituloSchema.parse(req.params);

      const result = await conquistaService.buscarPorTitulo(titulo);

      if (!result) {
        return res.status(404).json({
          message: "Conquista não encontrada.",
        });
      }

      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Título inválido.",
          errors: error.issues,
        });
      }

      return res.status(500).json({
        message: "Erro ao buscar conquista por título.",
      });
    }
  }

  async listarOrdenadasPorXp(req: Request, res: Response) {
    try {
      const result = await conquistaService.listarOrdenadasPorXp();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao listar conquistas por XP.",
      });
    }
  }
}

export const conquistaController = new ConquistaController();