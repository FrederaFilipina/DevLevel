import type { PrismaClient, RespostaQuestao } from "../prisma/generated/client";
import { prisma } from "../prisma/prisma";

export class QuestaoRespostaRepository {
  constructor(private readonly prisma: PrismaClient) {
    this.prisma;
  }

  async listarTodas(): Promise<RespostaQuestao[]> {
    try {
      return await this.prisma.respostaQuestao.findMany({
        orderBy: {
          id: "asc",
        },
      });
    } catch (error) {
      console.error("Erro ao listar respostas de questão:", error);
      throw new Error("Não foi possível listar as respostas.");
    }
  }

  async buscarPorId(id: number): Promise<RespostaQuestao | null> {
    try {
      return await this.prisma.respostaQuestao.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      console.error("Erro ao buscar resposta por ID:", error);
      throw new Error("Não foi possível buscar a resposta.");
    }
  }

  async listarPorQuestao(questaoId: number): Promise<RespostaQuestao[]> {
    try {
      return await this.prisma.respostaQuestao.findMany({
        where: {
          questaoId,
        },
        orderBy: {
          id: "asc",
        },
      });
    } catch (error) {
      console.error("Erro ao listar respostas por questão:", error);
      throw new Error("Não foi possível listar as respostas da questão.");
    }
  }

  async buscarCorretasPorQuestao(questaoId: number): Promise<RespostaQuestao[]> {
    try {
      return await this.prisma.respostaQuestao.findMany({
        where: {
          questaoId,
          pontuacao: {
            gt: 0,
          },
        },
        orderBy: {
          pontuacao: "desc",
        },
      });
    } catch (error) {
      console.error("Erro ao buscar respostas corretas:", error);
      throw new Error("Não foi possível buscar as respostas corretas.");
    }
  }
}

export const questaoRespostaRepository = new QuestaoRespostaRepository(prisma);