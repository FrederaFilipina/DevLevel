import { Router, Request, Response } from "express";
import { RespostaQuestaoService } from "../Services/questaoRespostaService";
import { RespostaQuestaoRepository } from "../Repositories/questaoRespostaRepository";
import { prisma } from "../prisma/prisma";

export class RespostaQuestaoController {
  private router: Router;
  private respostaQuestaoService: RespostaQuestaoService;

  constructor() {
    this.router = Router();
    const respostaQuestaoRepository = new RespostaQuestaoRepository(prisma);
    this.respostaQuestaoService = new RespostaQuestaoService(
      respostaQuestaoRepository
    );
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get("/:id", this.buscarPorId.bind(this));
    this.router.get("/questao/:questaoId", this.listarPorQuestao.bind(this));
    this.router.get("/questao/:questaoId/melhores", this.listarMelhoresRespostas.bind(this));
    this.router.get("/questao/:questaoId/performance", this.listarPorPerformance.bind(this));
    this.router.get("/questao/:questaoId/clean-code", this.listarPorCleanCode.bind(this));
  }

  private async buscarPorId(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const resposta = await this.respostaQuestaoService.buscarPorId(id);

      res.status(200).json({
        success: true,
        data: resposta,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error instanceof Error ? error.message : "Resposta não encontrada",
      });
    }
  }

  private async listarPorQuestao(req: Request, res: Response): Promise<void> {
    try {
      const { questaoId } = req.params;
      const respostas = await this.respostaQuestaoService.listarPorQuestao(questaoId);

      res.status(200).json({
        success: true,
        data: respostas,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Erro ao listar respostas",
      });
    }
  }

  private async listarMelhoresRespostas(req: Request, res: Response): Promise<void> {
    try {
      const { questaoId } = req.params;
      const respostas = await this.respostaQuestaoService.listarMelhoresRespostas(
        questaoId
      );

      res.status(200).json({
        success: true,
        data: respostas,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Erro ao listar respostas",
      });
    }
  }

  private async listarPorPerformance(req: Request, res: Response): Promise<void> {
    try {
      const { questaoId } = req.params;
      const respostas = await this.respostaQuestaoService.listarPorPerformance(
        questaoId
      );

      res.status(200).json({
        success: true,
        data: respostas,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Erro ao listar respostas",
      });
    }
  }

  private async listarPorCleanCode(req: Request, res: Response): Promise<void> {
    try {
      const { questaoId } = req.params;
      const respostas = await this.respostaQuestaoService.listarPorCleanCode(
        questaoId
      );

      res.status(200).json({
        success: true,
        data: respostas,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Erro ao listar respostas",
      });
    }
  }

  public getRouter(): Router {
    return this.router;
  }
}

export const respostaController = new RespostaQuestaoController()