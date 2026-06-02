import { Router } from "express";
import type { Request, Response } from "express";
import { TrilhaUsuarioService } from "../Services/usuarioTrilhaService";
import { TrilhaUsuarioRepository } from "../Repositories/usuarioTrilhaRepository";
import { prisma } from "../prisma/prisma";

export class TrilhaUsuarioController {
  private router: Router;
  private trilhaUsuarioService: TrilhaUsuarioService;

  constructor() {
    this.router = Router();
    const trilhaUsuarioRepository = new TrilhaUsuarioRepository(prisma);
    this.trilhaUsuarioService = new TrilhaUsuarioService(trilhaUsuarioRepository);
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get("/usuario/:usuarioId", this.listarPorUsuario.bind(this));
    this.router.get("/trilha/:trilhaId", this.listarPorTrilha.bind(this));
    this.router.get("/status/:status", this.listarPorStatus.bind(this));
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

      const trilhaUsuario = await this.trilhaUsuarioService.buscarPorId(idNumero);

      res.status(200).json({
        success: true,
        data: trilhaUsuario,
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

      const trilhasUsuario = await this.trilhaUsuarioService.listarPorUsuario(
        usuarioIdNumero
      );

      res.status(200).json({
        success: true,
        data: trilhasUsuario,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Erro ao listar trilhas",
      });
    }
  }

  private async listarPorTrilha(req: Request, res: Response): Promise<void> {
    try {
      const { trilhaId } = req.params;
      const trilhaIdNumero = Number(trilhaId);

      if (isNaN(trilhaIdNumero)) {
        res.status(400).json({
          success: false,
          message: "trilhaId deve ser um número",
        });
        return;
      }

      const trilhasUsuario = await this.trilhaUsuarioService.listarPorTrilha(
        trilhaIdNumero
      );

      res.status(200).json({
        success: true,
        data: trilhasUsuario,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Erro ao listar progressos",
      });
    }
  }

  private async listarPorStatus(req: Request, res: Response): Promise<void> {
    try {
      const { status } = req.params;
      const trilhasUsuario = await this.trilhaUsuarioService.listarPorStatus(
        status as any
      );

      res.status(200).json({
        success: true,
        data: trilhasUsuario,
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

export const trilhaUsuarioController = new TrilhaUsuarioController();
