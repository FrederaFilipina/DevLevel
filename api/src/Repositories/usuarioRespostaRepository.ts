import type { PrismaClient,  RespostaUsuario } from "../prisma/generated/client";

export class RespostaUsuarioRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async buscarPorId(id: number): Promise<RespostaUsuario | null> {
    return await this.prisma.respostaUsuario.findUnique({
      where: { id },
    });
  }

  async buscarPorUsuarioEQuestao(
    usuarioId: number,
    questaoId: number
  ): Promise<RespostaUsuario | null> {
    return await this.prisma.respostaUsuario.findUnique({
      where: {
        usuarioId_questaoId: {
          usuarioId,
          questaoId,
        },
      },
    });
  }

  async listarPorUsuario(
    usuarioId: number
  ): Promise<RespostaUsuario[]> {
    return await this.prisma.respostaUsuario.findMany({
      where: { usuarioId },
      orderBy: {
        respondidaEm: "desc",
      },
    });
  }

  async listarPorQuestao(
    questaoId: number
  ): Promise<RespostaUsuario[]> {
    return await this.prisma.respostaUsuario.findMany({
      where: { questaoId },
      orderBy: {
        respondidaEm: "desc",
      },
    });
  }

  async listarPorRespostaQuestao(
    respostaQuestaoId: number
  ): Promise<RespostaUsuario[]> {
    return await this.prisma.respostaUsuario.findMany({
      where: { respostaQuestaoId },
      orderBy: {
        respondidaEm: "desc",
      },
    });
  }
}