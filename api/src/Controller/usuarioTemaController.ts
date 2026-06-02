import { Router } from "express";
import type { Request, Response } from "express";
import { TemaUsuarioService } from "../Services/usuarioTemaService";
import { TemaUsuarioRepository } from "../Repositories/usuarioTemaRepository";
import { prisma } from "../prisma/prisma";

export class TemaUsuarioController {
  private router: Router;
  private temaUsuarioService: TemaUsuarioService;

  constructor() {
    this.router = Router();
    const temaUsuarioRepository = new TemaUsuarioRepository(prisma);
    this.temaUsuarioService = new TemaUsuarioService(temaUsuarioRepository);
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get("/usuario/:usuarioId", this.listarPorUsuario.bind(this));
    this.router.get("/tema/:temaId", this.listarPorTema.bind(this));
    this.router.get("/nivel/:nivel", this.listarPorNivel.bind(this));
    this.router.get("/:id", this.buscarPorId.bind(this));
  }

  private async buscarPorId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const idNumero = Number(id);

      if (isNaN(idNumero)) {
        res.status(400).json({
          success: false,
          message: "ID deve ser um número",
        });
        return;
      }

      const temaUsuario = await this.temaUsuarioService.buscarPorId(idNumero);

      res.status(200).json({
        success: true,
        data: temaUsuario,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error instanceof Error ? error.message : "Progresso não encontrado",
      });
    }
  }

  private async listarPorUsuario(req: Request, res: Response): Promise<void> {
    try {
      const { usuarioId } = req.params;
      const usuarioIdNumero = Number(usuarioId);

      if (isNaN(usuarioIdNumero)) {
        res.status(400).json({
          success: false,
          message: "usuarioId deve ser um número",
        });
        return;
      }

      const temasUsuario = await this.temaUsuarioService.listarPorUsuario(usuarioIdNumero);

      res.status(200).json({
        success: true,
        data: temasUsuario,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Erro ao listar temas",
      });
    }
  }

  private async listarPorTema(req: Request, res: Response): Promise<void> {
    try {
      const { temaId } = req.params;
      const temaIdNumero = Number(temaId);

      if (isNaN(temaIdNumero)) {
        res.status(400).json({
          success: false,
          message: "temaId deve ser um número",
        });
        return;
      }

      const temasUsuario = await this.temaUsuarioService.listarPorTema(temaIdNumero);

      res.status(200).json({
        success: true,
        data: temasUsuario,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Erro ao listar progressos",
      });
    }
  }

  private async listarPorNivel(req: Request, res: Response): Promise<void> {
    try {
      const { nivel } = req.params;
      const temasUsuario = await this.temaUsuarioService.listarPorNivel(
        nivel as any
      );

      res.status(200).json({
        success: true,
        data: temasUsuario,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Erro ao listar progressos",
      });
    }
  }

  public getRouter(): Router {
    return this.router;
  }
}

export const temaUsuarioController = new TemaUsuarioController();
