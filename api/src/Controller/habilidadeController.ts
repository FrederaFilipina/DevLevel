import { Router, Request, Response } from "express";
import { HabilidadeService } from "../Services/habilidadeService";
import { HabilidadeRepository } from "../Repositories/habilidadeRepository";
import { prisma } from "../prisma/prisma";

export class HabilidadeController {
  private router: Router;
  private habilidadeService: HabilidadeService;

  constructor() {
    this.router = Router();
    const habilidadeRepository = new HabilidadeRepository(prisma);
    this.habilidadeService = new HabilidadeService(habilidadeRepository);
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get("/", this.listarTodas.bind(this));
    this.router.get("/:id", this.buscarPorId.bind(this));
    this.router.get("/nome/:nome", this.buscarPorNome.bind(this));
  }

  private async listarTodas(req: Request, res: Response): Promise<void> {
    try {
      const habilidades = await this.habilidadeService.listarTodas();
      res.status(200).json({
        success: true,
        data: habilidades,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Erro ao listar habilidades",
      });
    }
  }

  private async buscarPorId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const habilidade = await this.habilidadeService.buscarPorId(id);

      res.status(200).json({
        success: true,
        data: habilidade,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error instanceof Error ? error.message : "Habilidade não encontrada",
      });
    }
  }

  private async buscarPorNome(req: Request, res: Response): Promise<void> {
    try {
      const { nome } = req.params;
      const habilidade = await this.habilidadeService.buscarPorNome(nome);

      res.status(200).json({
        success: true,
        data: habilidade,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error instanceof Error ? error.message : "Habilidade não encontrada",
      });
    }
  }

  public getRouter(): Router {
    return this.router;
  }
}

export const habilidadeController = new HabilidadeController()