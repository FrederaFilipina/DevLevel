import { PrismaClient, type RespostaUsuario } from "../prisma/generated/prisma";
export class RespostaUsuarioRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async buscarPorId(id: string): Promise<RespostaUsuario | null> {
    return await this.prisma.respostaUsuario.findUnique({
      where: { id },
    });
  }

  async buscarPorUsuarioEQuestao(
    usuarioId: string,
    questaoId: string
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
    usuarioId: string
  ): Promise<RespostaUsuario[]> {
    return await this.prisma.respostaUsuario.findMany({
      where: { usuarioId },
      orderBy: {
        respondidaEm: "desc",
      },
    });
  }

  async listarPorQuestao(
    questaoId: string
  ): Promise<RespostaUsuario[]> {
    return await this.prisma.respostaUsuario.findMany({
      where: { questaoId },
      orderBy: {
        respondidaEm: "desc",
      },
    });
  }

  async listarPorRespostaQuestao(
    respostaQuestaoId: string
  ): Promise<RespostaUsuario[]> {
    return await this.prisma.respostaUsuario.findMany({
      where: { respostaQuestaoId },
      orderBy: {
        respondidaEm: "desc",
      },
    });
  }
}