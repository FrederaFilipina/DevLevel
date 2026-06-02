import type { Request, Response } from "express";
import type { HabilidadeService } from "../Services/habilidadeService";

export class HabilidadeController {
  constructor(
    private readonly habilidadeService: HabilidadeService
  ) {}

  async listar(_req: Request, res: Response) {
    try {
      const habilidades =
        await this.habilidadeService.listarTodas();

      return res.status(200).json(habilidades);
    } catch {
      return res.status(500).json({
        erro: "Erro ao listar habilidades",
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

      const habilidade =
        await this.habilidadeService.buscarPorId(id);

      return res.status(200).json(habilidade);
    } catch {
      return res.status(500).json({
        erro: "Erro ao obter habilidade",
      });
    }
  }

  async buscarPorNome(req: Request, res: Response) {
    try {
      const nome = String(req.params.nome ?? "");

      const habilidade =
        await this.habilidadeService.buscarPorNome(
          nome
        );

      return res.status(200).json(habilidade);
    } catch {
      return res.status(500).json({
        erro: "Erro ao buscar habilidade por nome",
      });
    }
  }
}
