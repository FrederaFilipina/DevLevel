import { Router } from "express";
import type { Request, Response } from "express";
import { ConquistaUsuarioService } from "../Services/usuarioConquistaService";
import { ConquistaUsuarioRepository } from "../Repositories/usuarioConquistaRepository";
import { prisma } from "../prisma/prisma";

export class ConquistaUsuarioController {
  private router: Router;
  private conquistaUsuarioService: ConquistaUsuarioService;

  constructor() {
    this.router = Router();
    const conquistaUsuarioRepository = new ConquistaUsuarioRepository(prisma);
    this.conquistaUsuarioService = new ConquistaUsuarioService(
      conquistaUsuarioRepository
    );
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get("/", this.listarTodos.bind(this));
    this.router.get("/usuario/:usuarioId", this.listarPorUsuario.bind(this));
    this.router.get("/conquista/:conquistaId", this.listarPorConquista.bind(this));
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

      const conquistaUsuario = await this.conquistaUsuarioService.buscarPorId(idNumero);

      res.status(200).json({
        success: true,
        data: conquistaUsuario,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error instanceof Error ? error.message : "Conquista não encontrada",
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

      const conquistasUsuario = await this.conquistaUsuarioService.listarPorUsuario(
        usuarioIdNumero
      );

      res.status(200).json({
        success: true,
        data: conquistasUsuario,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Erro ao listar conquistas",
      });
    }
  }

  private async listarPorConquista(req: Request, res: Response): Promise<void> {
    try {
      const { conquistaId } = req.params;
      const conquistaIdNumero = Number(conquistaId);

      if (isNaN(conquistaIdNumero)) {
        res.status(400).json({
          success: false,
          message: "conquistaId deve ser um número",
        });
        return;
      }

      const conquistasUsuario = await this.conquistaUsuarioService.listarPorConquista(
        conquistaIdNumero
      );

      res.status(200).json({
        success: true,
        data: conquistasUsuario,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Erro ao listar conquistas",
      });
    }
  }

  private async listarTodos(req: Request, res: Response): Promise<void> {
    try {
      const conquistasUsuario = await this.conquistaUsuarioService.listarTodos();

      res.status(200).json({
        success: true,
        data: conquistasUsuario,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Erro ao listar conquistas",
      });
    }
  }

  public getRouter(): Router {
    return this.router;
  }
}

export const conquistaUsuarioController = new ConquistaUsuarioController();
