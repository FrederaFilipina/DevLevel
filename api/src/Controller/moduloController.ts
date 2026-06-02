import type { Request, Response } from "express";
import type { ModuloService } from "../Services/moduloService";

export class ModuloController {
  constructor(
    private readonly moduloService: ModuloService
  ) {}

  async listar(_req: Request, res: Response) {
    try {
      const modulos =
        await this.moduloService.listarTodos();

      return res.status(200).json(modulos);
    } catch {
      return res.status(500).json({
        erro: "Erro ao listar modulos",
      });
    }
  }

  async obter(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({
          erro: "ID invalido.",
        });
      }

      const modulo =
        await this.moduloService.buscarPorId(id);

      return res.status(200).json(modulo);
    } catch {
      return res.status(500).json({
        erro: "Erro ao obter modulo",
      });
    }
  }

  async listarPorTrilha(req: Request, res: Response) {
    try {
      const trilhaId = Number(req.params.trilhaId);

      if (isNaN(trilhaId)) {
        return res.status(400).json({
          erro: "ID da trilha invalido.",
        });
      }

      const modulos =
        await this.moduloService.listarPorTrilha(
          trilhaId
        );

      return res.status(200).json(modulos);
    } catch {
      return res.status(500).json({
        erro: "Erro ao listar modulos da trilha",
      });
    }
  }

  async buscarPorTrilhaEOrdem(
    req: Request,
    res: Response
  ) {
    try {
      const trilhaId = Number(req.params.trilhaId);

      if (isNaN(trilhaId)) {
        return res.status(400).json({
          erro: "ID da trilha invalido.",
        });
      }

      const ordem = Number(req.params.ordem);

      if (isNaN(ordem)) {
        return res.status(400).json({
          erro: "Ordem invalida.",
        });
      }

      const modulo =
        await this.moduloService.buscarPorTrilhaEOrdem(
          trilhaId,
          ordem
        );

      return res.status(200).json(modulo);
    } catch {
      return res.status(500).json({
        erro: "Erro ao buscar modulo por trilha e ordem",
      });
    }
  }
}
