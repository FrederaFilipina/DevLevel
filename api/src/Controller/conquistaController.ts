import { Router, Request, Response } from "express";
import { ConquistaService } from "../Services/conquistaService";
import { ConquistaRepository } from "../Repositories/conquistaRepository";
import { prisma } from "../prisma/prisma";

export class ConquistaController {
  private router: Router;
  private conquistaService: ConquistaService;

  constructor() {
    this.router = Router();
    const conquistaRepository = new ConquistaRepository(prisma);
    this.conquistaService = new ConquistaService(conquistaRepository);
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get("/", this.listarTodas.bind(this));
    this.router.get("/:id", this.buscarPorId.bind(this));
    this.router.get("/titulo/:titulo", this.buscarPorTitulo.bind(this));
  }

  private async listarTodas(req: Request, res: Response): Promise<void> {
    try {
      const conquistas = await this.conquistaService.listarTodas();
      res.status(200).json({
        success: true,
        data: conquistas,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Erro ao listar conquistas",
      });
    }
  }

  private async buscarPorId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const conquista = await this.conquistaService.buscarPorId(id);

      res.status(200).json({
        success: true,
        data: conquista,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error instanceof Error ? error.message : "Conquista não encontrada",
      });
    }
  }

  private async buscarPorTitulo(req: Request, res: Response): Promise<void> {
    try {
      const { titulo } = req.params;
      const conquista = await this.conquistaService.buscarPorTitulo(titulo);

      res.status(200).json({
        success: true,
        data: conquista,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error instanceof Error ? error.message : "Conquista não encontrada",
      });
    }
  }

  public getRouter(): Router {
    return this.router;
  }
}

export const conquistaController = new ConquistaController()