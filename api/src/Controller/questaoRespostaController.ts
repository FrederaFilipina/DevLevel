import type { Request, Response } from "express";
import type { RespostaQuestaoService } from "../Services/questaoRespostaService";
import { getParam, handleError } from "./utils";

export class QuestaoRespostaController {
  constructor(
    private readonly respostaQuestaoService: RespostaQuestaoService
  ) {}

  async obter(req: Request, res: Response) {
    try {
      const id = Number(getParam(req, "id"));

      if (isNaN(id)) {
        return res.status(400).json({
          erro: "ID inválido.",
        });
      }

      const respostaQuestao =
        await this.respostaQuestaoService.buscarPorId(
          id
        );

      return res.status(200).json(respostaQuestao);
    } catch (erro) {
      return handleError(
        res,
        erro,
        "Erro ao obter resposta da questão"
      );
    }
  }

  async listarPorQuestao(
    req: Request,
    res: Response
  ) {
    try {
      const questaoId = Number(
        getParam(req, "questaoId")
      );

      if (isNaN(questaoId)) {
        return res.status(400).json({
          erro: "ID da questão inválido.",
        });
      }

      const respostas =
        await this.respostaQuestaoService.listarPorQuestao(
          questaoId
        );

      return res.status(200).json(respostas);
    } catch (erro) {
      return handleError(
        res,
        erro,
        "Erro ao listar respostas da questão"
      );
    }
  }

  async buscarPorQuestaoETitulo(
    req: Request,
    res: Response
  ) {
    try {
      const questaoId = Number(
        getParam(req, "questaoId")
      );

      if (isNaN(questaoId)) {
        return res.status(400).json({
          erro: "ID da questão inválido.",
        });
      }

      const titulo = getParam(req, "titulo");

      const resposta =
        await this.respostaQuestaoService.buscarPorQuestaoETitulo(
          questaoId,
          titulo
        );

      return res.status(200).json(resposta);
    } catch (erro) {
      return handleError(
        res,
        erro,
        "Erro ao buscar resposta por título"
      );
    }
  }

  async listarMelhoresRespostas(
    req: Request,
    res: Response
  ) {
    try {
      const questaoId = Number(
        getParam(req, "questaoId")
      );

      if (isNaN(questaoId)) {
        return res.status(400).json({
          erro: "ID da questão inválido.",
        });
      }

      const respostas =
        await this.respostaQuestaoService.listarMelhoresRespostas(
          questaoId
        );

      return res.status(200).json(respostas);
    } catch (erro) {
      return handleError(
        res,
        erro,
        "Erro ao listar melhores respostas"
      );
    }
  }

  async listarPorPerformance(
    req: Request,
    res: Response
  ) {
    try {
      const questaoId = Number(
        getParam(req, "questaoId")
      );

      if (isNaN(questaoId)) {
        return res.status(400).json({
          erro: "ID da questão inválido.",
        });
      }

      const respostas =
        await this.respostaQuestaoService.listarPorPerformance(
          questaoId
        );

      return res.status(200).json(respostas);
    } catch (erro) {
      return handleError(
        res,
        erro,
        "Erro ao listar respostas por performance"
      );
    }
  }

  async listarPorCleanCode(
    req: Request,
    res: Response
  ) {
    try {
      const questaoId = Number(
        getParam(req, "questaoId")
      );

      if (isNaN(questaoId)) {
        return res.status(400).json({
          erro: "ID da questão inválido.",
        });
      }

      const respostas =
        await this.respostaQuestaoService.listarPorCleanCode(
          questaoId
        );

      return res.status(200).json(respostas);
    } catch (erro) {
      return handleError(
        res,
        erro,
        "Erro ao listar respostas por clean code"
      );
    }
  }
}