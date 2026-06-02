import type { Request, Response } from "express";
import type { ConquistaService } from "../Services/conquistaService";
import { getParam, handleError } from "./utils";

export class ConquistaController {
  constructor(
    private readonly conquistaService: ConquistaService
  ) {}

  async listar(_req: Request, res: Response) {
    try {
      const conquistas =
        await this.conquistaService.listarTodas();

      return res.status(200).json(conquistas);
    } catch (erro) {
      return handleError(
        res,
        erro,
        "Erro ao listar conquistas"
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

      const conquista =
        await this.conquistaService.buscarPorId(id);

      return res.status(200).json(conquista);
    } catch (erro) {
      return handleError(
        res,
        erro,
        "Erro ao obter conquista"
      );
    }
  }

  async buscarPorTitulo(
    req: Request,
    res: Response
  ) {
    try {
      const titulo = getParam(req, "titulo");

      const conquista =
        await this.conquistaService.buscarPorTitulo(
          titulo
        );

      return res.status(200).json(conquista);
    } catch (erro) {
      return handleError(
        res,
        erro,
        "Erro ao buscar conquista por título"
      );
    }
  }
}