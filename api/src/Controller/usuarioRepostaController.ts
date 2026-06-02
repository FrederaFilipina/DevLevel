import { Router, Request, Response } from "express";
import { RespostaUsuarioService } from "../Services/usuarioRespostaService";
import { RespostaUsuarioRepository } from "../Repositories/usuarioRespostaRepository";
import { prisma } from "../prisma/prisma";

export class RespostaUsuarioController {
  private router: Router;
  private respostaUsuarioService: RespostaUsuarioService;

  constructor() {
    this.router = Router();
    const respostaUsuarioRepository = new RespostaUsuarioRepository(prisma);
    this.respostaUsuarioService = new RespostaUsuarioService(
      respostaUsuarioRepository
    );
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.get("/usuario/:usuarioId", this.listarPorUsuario.bind(this));
    this.router.get("/questao/:questaoId", this.listarPorQuestao.bind(this));
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

      const resposta = await this.respostaUsuarioService.buscarPorId(idNumero);

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

      const respostas = await this.respostaUsuarioService.listarPorUsuario(usuarioIdNumero);

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

  private async listarPorQuestao(req: Request, res: Response): Promise<void> {
    try {
      const { questaoId } = req.params;
      const questaoIdNumero = Number(questaoId);

      if (isNaN(questaoIdNumero)) {
        res.status(400).json({
          success: false,
          message: "questaoId deve ser um número",
        });
        return;
      }

      const respostas = await this.respostaUsuarioService.listarPorQuestao(questaoIdNumero);

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

export const respostaUsuarioController = new RespostaUsuarioController();
