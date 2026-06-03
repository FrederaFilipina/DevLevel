import type { Request, Response } from "express";
import type { TrilhaService } from "../Services/trilhaService";

export class TrilhaController {
  constructor(
    private readonly trilhaService: TrilhaService
  ) { }

  async listar(_req: Request, res: Response) {
    try {
      const trilhas =
        await this.trilhaService.listarTodas();

      return res.status(200).json(trilhas);
    } catch {
      return res.status(500).json({
        erro: "Erro ao listar trilhas",
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

      const trilha =
        await this.trilhaService.buscarPorId(id);

      if (!trilha) {
        return res.status(404).json({
          erro: "Trilha não encontrada."
        });
      }

      return res.status(200).json(trilha);
    } catch {
      return res.status(500).json({
        erro: "Erro ao obter trilha",
      });
    }
  }

  async listarPorTema(req: Request, res: Response) {
    try {
      const temaId = Number(req.params.temaId);

      if (isNaN(temaId)) {
        return res.status(400).json({
          erro: "ID do tema invalido.",
        });
      }

      const trilhas =
        await this.trilhaService.listarPorTema(
          temaId
        );

      return res.status(200).json(trilhas);
    } catch {
      return res.status(500).json({
        erro: "Erro ao listar trilhas por tema",
      });
    }
  }

  async buscarPorTemaEOrdem(
    req: Request,
    res: Response
  ) {
    try {
      const temaId = Number(req.params.temaId);

      if (isNaN(temaId)) {
        return res.status(400).json({
          erro: "ID do tema invalido.",
        });
      }

      const ordem = Number(req.params.ordem);

      if (isNaN(ordem) || ordem <= 0) {
        return res.status(400).json({
          erro: "Ordem invalida.",
        });
      }

      const trilha =
        await this.trilhaService.buscarPorTemaEOrdem(
          temaId,
          ordem
        );
      if (!trilha) {
        return res.status(404).json({
          erro: "Trilha não encontrada."
        });
      }

      return res.status(200).json(trilha);
    } catch {
      return res.status(500).json({
        erro: "Erro ao buscar trilha por tema e ordem",
      });
    }
  }

  async buscarTrilhaAnterior(
    req: Request,
    res: Response
  ) {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({
          erro: "ID invalido.",
        });
      }

      const trilhaAnterior =
        await this.trilhaService.buscarTrilhaAnterior(
          id
        );

      return res.status(200).json(trilhaAnterior);
    } catch {
      return res.status(500).json({
        erro: "Erro ao buscar trilha anterior",
      });
    }
  }

  async buscarProximasTrilhas(
    req: Request,
    res: Response
  ) {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({
          erro: "ID invalido.",
        });
      }

      const proximasTrilhas =
        await this.trilhaService.buscarProximasTrilhas(
          id
        );

      return res.status(200).json(proximasTrilhas);
    } catch {
      return res.status(500).json({
        erro: "Erro ao buscar proximas trilhas",
      });
    }
  }
}
