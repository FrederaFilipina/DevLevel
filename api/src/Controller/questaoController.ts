import type { Request, Response } from "express";
import type { QuestaoService } from "../Services/questaoService";

export class QuestaoController {
  constructor(
    private readonly questaoService: QuestaoService
  ) { }

  async listar(_req: Request, res: Response) {
    try {
      const questoes =
        await this.questaoService.listarTodas();

      return res.status(200).json(questoes);
    } catch {
      return res.status(500).json({
        erro: "Erro ao listar questoes",
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

      const questao =
        await this.questaoService.buscarPorId(id);

      if (!questao) {
        return res.status(404).json({
          erro: "Questão não encontrada."
        });
      }

      return res.status(200).json(questao);
    } catch {
      return res.status(500).json({
        erro: "Erro ao obter questao",
      });
    }
  }

  async listarPorModulo(req: Request, res: Response) {
    try {
      const moduloId = Number(req.params.moduloId);

      if (isNaN(moduloId)) {
        return res.status(400).json({
          erro: "ID do modulo invalido.",
        });
      }

      const questoes =
        await this.questaoService.listarPorModulo(
          moduloId
        );

      return res.status(200).json(questoes);
    } catch {
      return res.status(500).json({
        erro: "Erro ao listar questoes do modulo",
      });
    }
  }

  async buscarPorModuloEOrdem(
    req: Request,
    res: Response
  ) {
    try {
      const moduloId = Number(req.params.moduloId);

      if (isNaN(moduloId)) {
        return res.status(400).json({
          erro: "ID do modulo invalido.",
        });
      }

      const ordem = Number(req.params.ordem);

      if (isNaN(ordem) || ordem <= 0) {
        return res.status(400).json({
          erro: "Ordem invalida.",
        });
      }

      const questao =
        await this.questaoService.buscarPorModuloEOrdem(
          moduloId,
          ordem
        );

      if (!questao) {
        return res.status(404).json({
          erro: "Questão não encontrada."
        });
      }

      return res.status(200).json(questao);
    } catch {
      return res.status(500).json({
        erro: "Erro ao buscar questao por modulo e ordem",
      });
    }
  }

  async listarPorDificuldade(
    req: Request,
    res: Response
  ) {
    try {
      const dificuldade = Number(req.params.dificuldade);

      if (isNaN(dificuldade)) {
        return res.status(400).json({
          erro: "Dificuldade invalida.",
        });
      }

      const questoes =
        await this.questaoService.listarPorDificuldade(
          dificuldade
        );

      return res.status(200).json(questoes);
    } catch {
      return res.status(500).json({
        erro: "Erro ao listar questoes por dificuldade",
      });
    }
  }
}
