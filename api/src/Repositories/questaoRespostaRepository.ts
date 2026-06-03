import {
  PrismaClient,
  type RespostaQuestao,
} from "../prisma/generated/prisma/client";

export class RespostaQuestaoRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async buscarPorId(
    id: number
  ): Promise<RespostaQuestao | null> {
    return await this.prisma.respostaQuestao.findUnique({
      where: {
        id,
      },
    });
  }

  async listarPorQuestao(
    questaoId: number
  ): Promise<RespostaQuestao[]> {
    return await this.prisma.respostaQuestao.findMany({
      where: {
        questaoId,
      },
      orderBy: {
        pontuacao: "desc",
      },
    });
  }

  async buscarPorQuestaoETitulo(
    questaoId: number,
    titulo: string
  ): Promise<RespostaQuestao | null> {
    return await this.prisma.respostaQuestao.findFirst({
      where: {
        questaoId,
        titulo,
      },
    });
  }

  async listarMelhoresRespostas(
    questaoId: number
  ): Promise<RespostaQuestao[]> {
    return await this.prisma.respostaQuestao.findMany({
      where: {
        questaoId,
      },
      orderBy: [
        { pontuacao: "desc" },
        { cleanCodeScore: "desc" },
        { performanceScore: "desc" },
        { legibilidadeScore: "desc" },
      ],
    });
  }

  async listarPorPerformance(
    questaoId: number
  ): Promise<RespostaQuestao[]> {
    return await this.prisma.respostaQuestao.findMany({
      where: {
        questaoId,
      },
      orderBy: {
        performanceScore: "desc",
      },
    });
  }

  async listarPorCleanCode(
    questaoId: number
  ): Promise<RespostaQuestao[]> {
    return await this.prisma.respostaQuestao.findMany({
      where: {
        questaoId,
      },
      orderBy: {
        cleanCodeScore: "desc",
      },
    });
  }
}