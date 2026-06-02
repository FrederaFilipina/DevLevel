import type { Request, Response } from "express";
import type { HabilidadeService } from "../Services/habilidadeService";
import { getParam, handleError } from "./utils";

export class HabilidadeController {
  constructor(
    private readonly habilidadeService: HabilidadeService
  ) {}

  async listar(_req: Request, res: Response) {
    try {
      const habilidades =
        await this.habilidadeService.listarTodas();

      return res.status(200).json(habilidades);
    } catch (erro) {
      return handleError(
        res,
        erro,
        "Erro ao listar habilidades"
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

      const habilidade =
        await this.habilidadeService.buscarPorId(id);

      return res.status(200).json(habilidade);
    } catch (erro) {
      return handleError(
        res,
        erro,
        "Erro ao obter habilidade"
      );
    }
  }

  async buscarPorNome(
    req: Request,
    res: Response
  ) {
    try {
      const nome = getParam(req, "nome");

      const habilidade =
        await this.habilidadeService.buscarPorNome(
          nome
        );

      return res.status(200).json(habilidade);
    } catch (erro) {
      return handleError(
        res,
        erro,
        "Erro ao buscar habilidade por nome"
      );
    }
  }
}