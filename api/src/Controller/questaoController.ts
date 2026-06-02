import type { Request, Response } from "express";
import type { QuestaoService } from "../Services/questaoService";
import { getParam, handleError } from "./utils";

export class QuestaoController {
  constructor(
    private readonly questaoService: QuestaoService
  ) {}

  async listar(_req: Request, res: Response) {
    try {
      const questoes =
        await this.questaoService.listarTodas();

      return res.status(200).json(questoes);
    } catch (erro) {
      return handleError(
        res,
        erro,
        "Erro ao listar questões"
      );
    }
  }

  async obter(req: Request, res: Response) {
    try {
      const id = Number(getParam(req, "id"));

      if (isNaN(id)) {
        return res.status(400).json({
          erro: "ID inválido.",
        });
      }

      const questao =
        await this.questaoService.buscarPorId(id);

      return res.status(200).json(questao);
    } catch (erro) {
      return handleError(
        res,
        erro,
        "Erro ao obter questão"
      );
    }
  }

  async listarPorModulo(
    req: Request,
    res: Response
  ) {
    try {
      const moduloId = Number(
        getParam(req, "moduloId")
      );

      if (isNaN(moduloId)) {
        return res.status(400).json({
          erro: "ID do módulo inválido.",
        });
      }

      const questoes =
        await this.questaoService.listarPorModulo(
          moduloId
        );

      return res.status(200).json(questoes);
    } catch (erro) {
      return handleError(
        res,
        erro,
        "Erro ao listar questões do módulo"
      );
    }
  }

  async buscarPorModuloEOrdem(
    req: Request,
    res: Response
  ) {
    try {
      const moduloId = Number(
        getParam(req, "moduloId")
      );

      if (isNaN(moduloId)) {
        return res.status(400).json({
          erro: "ID do módulo inválido.",
        });
      }

      const ordem = Number(
        getParam(req, "ordem")
      );

      if (isNaN(ordem)) {
        return res.status(400).json({
          erro: "Ordem inválida.",
        });
      }

      const questao =
        await this.questaoService.buscarPorModuloEOrdem(
          moduloId,
          ordem
        );

      return res.status(200).json(questao);
    } catch (erro) {
      return handleError(
        res,
        erro,
        "Erro ao buscar questão por módulo e ordem"
      );
    }
  }

  async listarPorDificuldade(
    req: Request,
    res: Response
  ) {
    try {
      const dificuldade = Number(
        getParam(req, "dificuldade")
      );

      if (isNaN(dificuldade)) {
        return res.status(400).json({
          erro: "Dificuldade inválida.",
        });
      }

      const questoes =
        await this.questaoService.listarPorDificuldade(
          dificuldade
        );

      return res.status(200).json(questoes);
    } catch (erro) {
      return handleError(
        res,
        erro,
        "Erro ao listar questões por dificuldade"
      );
    }
  }
}