import { PrismaClient, type RespostaQuestao } from "../prisma/generated/prisma";

export class RespostaQuestaoRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async buscarPorId(id: string): Promise<RespostaQuestao | null> {
    return await this.prisma.respostaQuestao.findUnique({
      where: { id },
    });
  }

  async listarPorQuestao(
    questaoId: string
  ): Promise<RespostaQuestao[]> {
    return await this.prisma.respostaQuestao.findMany({
      where: { questaoId },
      orderBy: {
        pontuacao: "desc",
      },
    });
  }

  async buscarPorQuestaoETitulo(
    questaoId: string,
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
    questaoId: string
  ): Promise<RespostaQuestao[]> {
    return await this.prisma.respostaQuestao.findMany({
      where: { questaoId },
      orderBy: [
        { pontuacao: "desc" },
        { cleanCodeScore: "desc" },
        { performanceScore: "desc" },
        { legibilidadeScore: "desc" },
      ],
    });
  }

  async listarPorPerformance(
    questaoId: string
  ): Promise<RespostaQuestao[]> {
    return await this.prisma.respostaQuestao.findMany({
      where: { questaoId },
      orderBy: {
        performanceScore: "desc",
      },
    });
  }

  async listarPorCleanCode(
    questaoId: string
  ): Promise<RespostaQuestao[]> {
    return await this.prisma.respostaQuestao.findMany({
      where: { questaoId },
      orderBy: {
        cleanCodeScore: "desc",
      },
    });
  }
}