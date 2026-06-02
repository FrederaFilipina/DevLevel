import { Router, Request, Response } from "express";
import { TrilhaService } from "../services/trilhaService";
import { TrilhaRepository } from "../Repositories/trilhaRepository";
import { prisma } from "../prisma/prisma";

export class TrilhaController {
  private router: Router;
  private trilhaService: TrilhaService;

  constructor() {
    this.router = Router();
    const trilhaRepository = new TrilhaRepository(prisma);
    this.trilhaService = new TrilhaService(trilhaRepository);
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get("/", this.listarTodas.bind(this));
    this.router.get("/:id", this.buscarPorId.bind(this));
    this.router.get("/tema/:temaId", this.listarPorTema.bind(this));
    this.router.get("/:id/anterior", this.buscarTrilhaAnterior.bind(this));
    this.router.get("/:id/proximas", this.buscarProximasTrilhas.bind(this));
  }

  private async listarTodas(req: Request, res: Response): Promise<void> {
    try {
      const trilhas = await this.trilhaService.listarTodas();
      res.status(200).json({
        success: true,
        data: trilhas,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Erro ao listar trilhas",
      });
    }
  }

  private async buscarPorId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const trilha = await this.trilhaService.buscarPorId(id);

      res.status(200).json({
        success: true,
        data: trilha,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error instanceof Error ? error.message : "Trilha não encontrada",
      });
    }
  }

  private async listarPorTema(req: Request, res: Response): Promise<void> {
    try {
      const { temaId } = req.params;
      const trilhas = await this.trilhaService.listarPorTema(temaId);

      res.status(200).json({
        success: true,
        data: trilhas,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Erro ao listar trilhas",
      });
    }
  }

  private async buscarTrilhaAnterior(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const trilha = await this.trilhaService.buscarTrilhaAnterior(id);

      res.status(200).json({
        success: true,
        data: trilha,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error instanceof Error ? error.message : "Trilha anterior não encontrada",
      });
    }
  }

  private async buscarProximasTrilhas(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const trilhas = await this.trilhaService.buscarProximasTrilhas(id);

      res.status(200).json({
        success: true,
        data: trilhas,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Erro ao buscar próximas trilhas",
      });
    }
  }

  public getRouter(): Router {
    return this.router;
  }
}

export const trilhaController = new TrilhaController()