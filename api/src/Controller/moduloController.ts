import { Router, Request, Response } from "express";
import { ModuloService } from "../Services/moduloService";
import { ModuloRepository } from "../Repositories/moduloRepository";
import { prisma } from "../prisma/prisma";

export class ModuloController {
  private router: Router;
  private moduloService: ModuloService;

  constructor() {
    this.router = Router();
    const moduloRepository = new ModuloRepository(prisma);
    this.moduloService = new ModuloService(moduloRepository);
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get("/", this.listarTodos.bind(this));
    this.router.get("/:id", this.buscarPorId.bind(this));
    this.router.get("/trilha/:trilhaId", this.listarPorTrilha.bind(this));
  }

  private async listarTodos(req: Request, res: Response): Promise<void> {
    try {
      const modulos = await this.moduloService.listarTodos();
      res.status(200).json({
        success: true,
        data: modulos,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Erro ao listar módulos",
      });
    }
  }

  private async buscarPorId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const modulo = await this.moduloService.buscarPorId(id);

      res.status(200).json({
        success: true,
        data: modulo,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error instanceof Error ? error.message : "Módulo não encontrado",
      });
    }
  }

  private async listarPorTrilha(req: Request, res: Response): Promise<void> {
    try {
      const { trilhaId } = req.params;
      const modulos = await this.moduloService.listarPorTrilha(trilhaId);

      res.status(200).json({
        success: true,
        data: modulos,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Erro ao listar módulos",
      });
    }
  }

  public getRouter(): Router {
    return this.router;
  }
}

export const moduloController = new ModuloController()