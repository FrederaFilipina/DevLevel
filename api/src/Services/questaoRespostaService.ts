import z from "zod";
import type { RespostaQuestao } from "../prisma/generated/client";
import {
  questaoRespostaRepository,
  QuestaoRespostaRepository,
} from "../repositories/questaoRespostaRepository";

export class QuestaoRespostaService {
  constructor(private readonly repository: QuestaoRespostaRepository) {}

  async listarTodas(): Promise<RespostaQuestao[]> {
    try {
      return await this.repository.listarTodas();
    } catch (error) {
      console.error("Erro no service ao listar respostas:", error);
      throw new Error("Não foi possível listar as respostas.");
    }
  }

  async buscarPorId(id: number): Promise<RespostaQuestao | null> {
    const schema = z.number().int().positive("ID inválido");
    const idValidated = schema.parse(id);

    try {
      return await this.repository.buscarPorId(idValidated);
    } catch (error) {
      console.error("Erro no service ao buscar resposta por ID:", error);
      throw new Error("Não foi possível buscar a resposta.");
    }
  }

  async listarPorQuestao(questaoId: number): Promise<RespostaQuestao[]> {
    const schema = z.number().int().positive("QuestaoId inválido");
    const questaoIdValidated = schema.parse(questaoId);

    try {
      return await this.repository.listarPorQuestao(questaoIdValidated);
    } catch (error) {
      console.error("Erro no service ao listar respostas por questão:", error);
      throw new Error("Não foi possível listar as respostas da questão.");
    }
  }

  async buscarCorretasPorQuestao(
    questaoId: number
  ): Promise<RespostaQuestao[]> {
    const schema = z.number().int().positive("QuestaoId inválido");
    const questaoIdValidated = schema.parse(questaoId);

    try {
      return await this.repository.buscarCorretasPorQuestao(
        questaoIdValidated
      );
    } catch (error) {
      console.error("Erro no service ao buscar respostas corretas:", error);
      throw new Error("Não foi possível buscar as respostas corretas.");
    }
  }
}

export const questaoRespostaService = new QuestaoRespostaService(
  questaoRespostaRepository
);