import { Router, Request, Response } from "express";
import { QuestaoService } from "../Services/questaoService";
import { QuestaoRepository } from "../Repositories/questaoRepository";
import { prisma } from "../prisma/prisma";

export class QuestaoController {
  private router: Router;
  private questaoService: QuestaoService;

  constructor() {
    this.router = Router();
    const questaoRepository = new QuestaoRepository(prisma);
    this.questaoService = new QuestaoService(questaoRepository);
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get("/", this.listarTodas.bind(this));
    this.router.get("/:id", this.buscarPorId.bind(this));
    this.router.get("/modulo/:moduloId", this.listarPorModulo.bind(this));
    this.router.get("/dificuldade/:dificuldade", this.listarPorDificuldade.bind(this));
  }

  private async listarTodas(req: Request, res: Response): Promise<void> {
    try {
      const questoes = await this.questaoService.listarTodas();
      res.status(200).json({
        success: true,
        data: questoes,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Erro ao listar questões",
      });
    }
  }

  private async buscarPorId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const questao = await this.questaoService.buscarPorId(id);

      res.status(200).json({
        success: true,
        data: questao,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error instanceof Error ? error.message : "Questão não encontrada",
      });
    }
  }

  private async listarPorModulo(req: Request, res: Response): Promise<void> {
    try {
      const { moduloId } = req.params;
      const questoes = await this.questaoService.listarPorModulo(moduloId);

      res.status(200).json({
        success: true,
        data: questoes,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Erro ao listar questões",
      });
    }
  }

  private async listarPorDificuldade(req: Request, res: Response): Promise<void> {
    try {
      const { dificuldade } = req.params;
      const questoes = await this.questaoService.listarPorDificuldade(
        Number(dificuldade)
      );

      res.status(200).json({
        success: true,
        data: questoes,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Erro ao listar questões",
      });
    }
  }

  public getRouter(): Router {
    return this.router;
  }
}

export const questaoController = new QuestaoController()