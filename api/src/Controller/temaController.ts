import { Router, Request, Response } from "express";
import { TemaService } from "../Services/temaService";
import { TemaRepository } from "../Repositories/temaRepository";
import { prisma } from "../prisma/prisma";

export class TemaController {
  private router: Router;
  private temaService: TemaService;

  constructor() {
    this.router = Router();
    const temaRepository = new TemaRepository(prisma);
    this.temaService = new TemaService(temaRepository);
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get("/nome/:nome", this.buscarPorNome.bind(this));  // ← Específico primeiro
    this.router.get("/:id", this.buscarPorId.bind(this));
    this.router.get("/", this.listarTodos.bind(this));
  }

  private async listarTodos(req: Request, res: Response): Promise<void> {
    try {
      const temas = await this.temaService.listarTodos();
      res.status(200).json({
        success: true,
        data: temas,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Erro ao listar temas",
      });
    }
  }

  private async buscarPorId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const idNumero = Number(id);  // ← Converte string para number
      
      if (isNaN(idNumero)) {
        res.status(400).json({
          success: false,
          message: "ID deve ser um número",
        });
        return;
      }

      const tema = await this.temaService.buscarPorId(idNumero);

      res.status(200).json({
        success: true,
        data: tema,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error instanceof Error ? error.message : "Tema não encontrado",
      });
    }
  }

  private async buscarPorNome(req: Request, res: Response): Promise<void> {
    try {
      const { nome } = req.params;
      const tema = await this.temaService.buscarPorNome(nome);

      res.status(200).json({
        success: true,
        data: tema,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error instanceof Error ? error.message : "Tema não encontrado",
      });
    }
  }

  public getRouter(): Router {
    return this.router;
  }
}

export const temaController = new TemaController();