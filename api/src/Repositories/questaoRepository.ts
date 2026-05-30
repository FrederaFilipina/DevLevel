import { PrismaClient, type Questao } from "../prisma/generated/prisma";

export class QuestaoRepository {
  constructor(private prisma: PrismaClient) {}

  async listarTodas(): Promise<Questao[]> {
    return await this.prisma.questao.findMany({
      orderBy: [
        { moduloId: "asc" },
        { ordem: "asc" },
      ],
    });
  }

  async buscarPorId(id: string): Promise<Questao | null> {
    return await this.prisma.questao.findUnique({
      where: { id },
    });
  }

  async listarPorModulo(moduloId: string): Promise<Questao[]> {
    return await this.prisma.questao.findMany({
      where: { moduloId },
      orderBy: {
        ordem: "asc",
      },
    });
  }

  async buscarPorModuloEOrdem(
    moduloId: string,
    ordem: number
  ): Promise<Questao | null> {
    return await this.prisma.questao.findUnique({
      where: {
        moduloId_ordem: {
          moduloId,
          ordem,
        },
      },
    });
  }

  async listarPorDificuldade(
    dificuldade: number
  ): Promise<Questao[]> {
    return await this.prisma.questao.findMany({
      where: {
        dificuldade,
      },
      orderBy: {
        ordem: "asc",
      },
    });
  }
}