import { Router } from "express";
import type { Request, Response } from "express";
import { HabilidadeUsuarioService } from "../Services/usuarioHabilidadeService";
import { HabilidadeUsuarioRepository } from "../Repositories/usuarioHabilidadeRepository";
import { prisma } from "../prisma/prisma";

export class HabilidadeUsuarioController {
  private router: Router;
  private habilidadeUsuarioService: HabilidadeUsuarioService;

  constructor() {
    this.router = Router();
    const habilidadeUsuarioRepository = new HabilidadeUsuarioRepository(prisma);
    this.habilidadeUsuarioService = new HabilidadeUsuarioService(
      habilidadeUsuarioRepository
    );
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get("/usuario/:usuarioId", this.listarPorUsuario.bind(this));
    this.router.get("/habilidade/:habilidadeId", this.listarPorHabilidade.bind(this));
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

      const habilidadeUsuario = await this.habilidadeUsuarioService.buscarPorId(idNumero);

      res.status(200).json({
        success: true,
        data: habilidadeUsuario,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error instanceof Error ? error.message : "Habilidade não encontrada",
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

      const habilidadesUsuario = await this.habilidadeUsuarioService.listarPorUsuario(
        usuarioIdNumero
      );

      res.status(200).json({
        success: true,
        data: habilidadesUsuario,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Erro ao listar habilidades",
      });
    }
  }

  private async listarPorHabilidade(req: Request, res: Response): Promise<void> {
    try {
      const { habilidadeId } = req.params;
      const habilidadeIdNumero = Number(habilidadeId);

      if (isNaN(habilidadeIdNumero)) {
        res.status(400).json({
          success: false,
          message: "habilidadeId deve ser um número",
        });
        return;
      }

      const habilidadesUsuario = await this.habilidadeUsuarioService.listarPorHabilidade(
        habilidadeIdNumero
      );

      res.status(200).json({
        success: true,
        data: habilidadesUsuario,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Erro ao listar habilidades",
      });
    }
  }

  private async listarPorNivel(req: Request, res: Response): Promise<void> {
    try {
      const { nivel } = req.params;
      const nivelNumero = Number(nivel);

      if (isNaN(nivelNumero)) {
        res.status(400).json({
          success: false,
          message: "nivel deve ser um número",
        });
        return;
      }

      const habilidadesUsuario = await this.habilidadeUsuarioService.listarPorNivel(
        nivelNumero
      );

      res.status(200).json({
        success: true,
        data: habilidadesUsuario,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Erro ao listar habilidades",
      });
    }
  }

  public getRouter(): Router {
    return this.router;
  }
}

export const habilidadeUsuarioController = new HabilidadeUsuarioController();
