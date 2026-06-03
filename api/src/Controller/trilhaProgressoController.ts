import type { Request, Response } from "express";
import { trilhaProgressoService } from "../services/trilhaProgressoService";

export class TrilhaProgressoController {
  // =========================================
  // PROCESSAR RESPOSTA E AVANÇAR TRILHA
  // =========================================

  async responder(req: Request, res: Response): Promise<Response> {
    try {
      const {
        usuarioId,
        trilhaId,
        questaoId,
        respostaQuestaoId,
        correta,
        pontuacao,
        proximaQuestaoId,
      } = req.body;

      const resultado = await trilhaProgressoService.processarResposta({
        usuarioId,
        trilhaId,
        questaoId,
        respostaQuestaoId,
        correta,
        pontuacao,
        proximaQuestaoId,
      });

      return res.status(200).json(resultado);
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Erro ao processar progresso da trilha",
      });
    }
  }
}

export const trilhaProgressoController = new TrilhaProgressoController();