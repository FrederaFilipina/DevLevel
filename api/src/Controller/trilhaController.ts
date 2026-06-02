import type { Request, Response } from "express";
import type { TrilhaService } from "../Services/trilhaService";
import { getParam, handleError } from "./utils";

export class TrilhaController {
  constructor(
    private readonly trilhaService: TrilhaService
  ) {}

  async listar(_req: Request, res: Response) {
    try {
      const trilhas =
        await this.trilhaService.listarTodas();

      return res.status(200).json(trilhas);
    } catch (erro) {
      return handleError(
        res,
        erro,
        "Erro ao listar trilhas"
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

      const trilha =
        await this.trilhaService.buscarPorId(id);

      return res.status(200).json(trilha);
    } catch (erro) {
      return handleError(
        res,
        erro,
        "Erro ao obter trilha"
      );
    }
  }

  async listarPorTema(
    req: Request,
    res: Response
  ) {
    try {
      const temaId = Number(
        getParam(req, "temaId")
      );

      if (isNaN(temaId)) {
        return res.status(400).json({
          erro: "ID do tema inválido.",
        });
      }

      const trilhas =
        await this.trilhaService.listarPorTema(
          temaId
        );

      return res.status(200).json(trilhas);
    } catch (erro) {
      return handleError(
        res,
        erro,
        "Erro ao listar trilhas por tema"
      );
    }
  }

  async buscarPorTemaEOrdem(
    req: Request,
    res: Response
  ) {
    try {
      const temaId = Number(
        getParam(req, "temaId")
      );

      if (isNaN(temaId)) {
        return res.status(400).json({
          erro: "ID do tema inválido.",
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

      const trilha =
        await this.trilhaService.buscarPorTemaEOrdem(
          temaId,
          ordem
        );

      return res.status(200).json(trilha);
    } catch (erro) {
      return handleError(
        res,
        erro,
        "Erro ao buscar trilha por tema e ordem"
      );
    }
  }

  async buscarTrilhaAnterior(
    req: Request,
    res: Response
  ) {
    try {
      const id = Number(getParam(req, "id"));

      if (isNaN(id)) {
        return res.status(400).json({
          erro: "ID inválido.",
        });
      }

      const trilhaAnterior =
        await this.trilhaService.buscarTrilhaAnterior(
          id
        );

      return res.status(200).json(trilhaAnterior);
    } catch (erro) {
      return handleError(
        res,
        erro,
        "Erro ao buscar trilha anterior"
      );
    }
  }

  async buscarProximasTrilhas(
    req: Request,
    res: Response
  ) {
    try {
      const id = Number(getParam(req, "id"));

      if (isNaN(id)) {
        return res.status(400).json({
          erro: "ID inválido.",
        });
      }

      const proximasTrilhas =
        await this.trilhaService.buscarProximasTrilhas(
          id
        );

      return res.status(200).json(proximasTrilhas);
    } catch (erro) {
      return handleError(
        res,
        erro,
        "Erro ao buscar próximas trilhas"
      );
    }
  }
}