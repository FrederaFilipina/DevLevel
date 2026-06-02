import type { Request, Response } from "express";
import type { RespostaQuestaoService } from "../Services/questaoRespostaService";

export class QuestaoRespostaController {
  constructor(
    private readonly respostaQuestaoService: RespostaQuestaoService
  ) { }

  async obter(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({
          erro: "ID invalido.",
        });
      }

      const respostaQuestao =
        await this.respostaQuestaoService.buscarPorId(
          id
        );

      if (!respostaQuestao) {
        return res.status(404).json({
          erro: "Resposta não encontrada."
        });
      }

      return res.status(200).json(respostaQuestao);
    } catch {
      return res.status(500).json({
        erro: "Erro ao obter resposta da questao",
      });
    }
  }

  async listarPorQuestao(req: Request, res: Response) {
    try {
      const questaoId = Number(req.params.questaoId);

      if (isNaN(questaoId)) {
        return res.status(400).json({
          erro: "ID da questao invalido.",
        });
      }

      const respostas =
        await this.respostaQuestaoService.listarPorQuestao(
          questaoId
        );

      return res.status(200).json(respostas);
    } catch {
      return res.status(500).json({
        erro: "Erro ao listar respostas da questao",
      });
    }
  }

  async buscarPorQuestaoETitulo(
    req: Request,
    res: Response
  ) {
    try {
      const questaoId = Number(req.params.questaoId);

      if (isNaN(questaoId)) {
        return res.status(400).json({
          erro: "ID da questao invalido.",
        });
      }

      const titulo = String(req.params.titulo ?? "");


      const resposta =
        await this.respostaQuestaoService.buscarPorQuestaoETitulo(
          questaoId,
          titulo
        );
      if (!resposta) {
        return res.status(404).json({
          erro: "Resposta não encontrada."
        });
      }

      return res.status(200).json(resposta);
    } catch {
      return res.status(500).json({
        erro: "Erro ao buscar resposta por titulo",
      });
    }
  }

  async listarMelhoresRespostas(
    req: Request,
    res: Response
  ) {
    try {
      const questaoId = Number(req.params.questaoId);

      if (isNaN(questaoId)) {
        return res.status(400).json({
          erro: "ID da questao invalido.",
        });
      }

      const respostas =
        await this.respostaQuestaoService.listarMelhoresRespostas(
          questaoId
        );

      return res.status(200).json(respostas);
    } catch {
      return res.status(500).json({
        erro: "Erro ao listar melhores respostas",
      });
    }
  }

  async listarPorPerformance(
    req: Request,
    res: Response
  ) {
    try {
      const questaoId = Number(req.params.questaoId);

      if (isNaN(questaoId)) {
        return res.status(400).json({
          erro: "ID da questao invalido.",
        });
      }

      const respostas =
        await this.respostaQuestaoService.listarPorPerformance(
          questaoId
        );

      return res.status(200).json(respostas);
    } catch {
      return res.status(500).json({
        erro: "Erro ao listar respostas por performance",
      });
    }
  }

  async listarPorCleanCode(
    req: Request,
    res: Response
  ) {
    try {
      const questaoId = Number(req.params.questaoId);

      if (isNaN(questaoId)) {
        return res.status(400).json({
          erro: "ID da questao invalido.",
        });
      }

      const respostas =
        await this.respostaQuestaoService.listarPorCleanCode(
          questaoId
        );

      return res.status(200).json(respostas);
    } catch {
      return res.status(500).json({
        erro: "Erro ao listar respostas por clean code",
      });
    }
  }
}
