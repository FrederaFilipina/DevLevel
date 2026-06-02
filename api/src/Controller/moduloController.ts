import type { Request, Response } from "express";
import type { ModuloService } from "../Services/moduloService";
import { getParam, handleError } from "./utils";

export class ModuloController {
  constructor(
    private readonly moduloService: ModuloService
  ) {}

  async listar(_req: Request, res: Response) {
    try {
      const modulos =
        await this.moduloService.listarTodos();

      return res.status(200).json(modulos);
    } catch (erro) {
      return handleError(
        res,
        erro,
        "Erro ao listar módulos"
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

      const modulo =
        await this.moduloService.buscarPorId(id);

      return res.status(200).json(modulo);
    } catch (erro) {
      return handleError(
        res,
        erro,
        "Erro ao obter módulo"
      );
    }
  }

  async listarPorTrilha(
    req: Request,
    res: Response
  ) {
    try {
      const trilhaId = Number(
        getParam(req, "trilhaId")
      );

      if (isNaN(trilhaId)) {
        return res.status(400).json({
          erro: "ID da trilha inválido.",
        });
      }

      const modulos =
        await this.moduloService.listarPorTrilha(
          trilhaId
        );

      return res.status(200).json(modulos);
    } catch (erro) {
      return handleError(
        res,
        erro,
        "Erro ao listar módulos da trilha"
      );
    }
  }

  async buscarPorTrilhaEOrdem(
    req: Request,
    res: Response
  ) {
    try {
      const trilhaId = Number(
        getParam(req, "trilhaId")
      );

      if (isNaN(trilhaId)) {
        return res.status(400).json({
          erro: "ID da trilha inválido.",
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

      const modulo =
        await this.moduloService.buscarPorTrilhaEOrdem(
          trilhaId,
          ordem
        );

      return res.status(200).json(modulo);
    } catch (erro) {
      return handleError(
        res,
        erro,
        "Erro ao buscar módulo por trilha e ordem"
      );
    }
  }
}