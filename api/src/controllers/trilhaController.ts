import type { Request, Response } from "express";
import { z, ZodError } from "zod";
import { trilhaService } from "../services/trilhaService";

const idSchema = z.object({
  id: z.coerce.number().int().positive("ID inválido"),
});

const temaIdSchema = z.object({
  temaId: z.coerce.number().int().positive("TemaId inválido"),
});

const temaOrdemSchema = z.object({
  temaId: z.coerce.number().int().positive("TemaId inválido"),
  ordem: z.coerce.number().int().nonnegative("Ordem inválida"),
});

export class TrilhaController {
  async listarTodas(req: Request, res: Response) {
    try {
      const result = await trilhaService.listarTodas();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao listar trilhas.",
      });
    }
  }

  async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = idSchema.parse(req.params);

      const result = await trilhaService.buscarPorId(id);

      if (!result) {
        return res.status(404).json({
          message: "Trilha não encontrada.",
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
        message: "Erro ao buscar trilha por ID.",
      });
    }
  }

  async listarPorTema(req: Request, res: Response) {
    try {
      const { temaId } = temaIdSchema.parse(req.params);

      const result = await trilhaService.listarPorTema(temaId);

      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "TemaId inválido.",
          errors: error.issues,
        });
      }

      return res.status(500).json({
        message: "Erro ao listar trilhas por tema.",
      });
    }
  }

  async buscarPorTemaEOrdem(req: Request, res: Response) {
    try {
      const { temaId, ordem } = temaOrdemSchema.parse(req.params);

      const result = await trilhaService.buscarPorTemaEOrdem(
        temaId,
        ordem
      );

      if (!result) {
        return res.status(404).json({
          message: "Trilha não encontrada.",
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
        message: "Erro ao buscar trilha por tema e ordem.",
      });
    }
  }

  async buscarComDependencias(req: Request, res: Response) {
    try {
      const { id } = idSchema.parse(req.params);

      const result = await trilhaService.buscarComDependencias(id);

      if (!result) {
        return res.status(404).json({
          message: "Trilha não encontrada.",
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
        message: "Erro ao buscar trilha com dependências.",
      });
    }
  }

  async listarComRegrasPorTema(req: Request, res: Response) {
    try {
      const { temaId } = temaIdSchema.parse(req.params);

      const result = await trilhaService.listarComRegrasPorTema(temaId);

      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "TemaId inválido.",
          errors: error.issues,
        });
      }

      return res.status(500).json({
        message: "Erro ao listar trilhas com regras.",
      });
    }
  }

  async validarAcessoTrilha(req: Request, res: Response) {
    try {
      const { id } = idSchema.parse(req.params);

      const trilha = await trilhaService.buscarComDependencias(id);

      if (!trilha) {
        return res.status(404).json({
          message: "Trilha não encontrada.",
        });
      }

      const acesso = await trilhaService.validarAcessoTrilha(trilha);

      return res.status(200).json({
        trilhaId: id,
        acesso,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "ID inválido.",
          errors: error.issues,
        });
      }

      return res.status(500).json({
        message: "Erro ao validar acesso da trilha.",
      });
    }
  }
}

export const trilhaController = new TrilhaController();