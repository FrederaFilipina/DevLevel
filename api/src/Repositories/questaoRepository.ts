import type { PrismaClient, Questao } from "../prisma/generated/client";
import { prisma } from "../prisma/prisma";

export class QuestaoRepository {
  constructor(private readonly prisma: PrismaClient) {
    this.prisma;
  }

  async listarTodas(): Promise<Questao[]> {
    try {
      return await this.prisma.questao.findMany({
        orderBy: {
          ordem: "asc",
        },
      });
    } catch (error) {
      console.error("Erro ao listar questões:", error);
      throw new Error("Não foi possível listar as questões.");
    }
  }

  async buscarPorId(id: number): Promise<Questao | null> {
    try {
      return await this.prisma.questao.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      console.error("Erro ao buscar questão por ID:", error);
      throw new Error("Não foi possível buscar a questão.");
    }
  }

  async listarPorModulo(moduloId: number): Promise<Questao[]> {
    try {
      return await this.prisma.questao.findMany({
        where: {
          moduloId,
        },
        orderBy: {
          ordem: "asc",
        },
      });
    } catch (error) {
      console.error("Erro ao listar questões por módulo:", error);
      throw new Error("Não foi possível listar as questões do módulo.");
    }
  }

  async buscarPorModuloEOrdem(
    moduloId: number,
    ordem: number
  ): Promise<Questao | null> {
    try {
      return await this.prisma.questao.findFirst({
        where: {
          moduloId,
          ordem,
        },
      });
    } catch (error) {
      console.error("Erro ao buscar questão por módulo e ordem:", error);
      throw new Error("Não foi possível buscar a questão.");
    }
  }
}

export const questaoRepository = new QuestaoRepository(prisma);