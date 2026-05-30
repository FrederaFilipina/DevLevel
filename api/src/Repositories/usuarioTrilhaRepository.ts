import { PrismaClient, type TrilhaUsuario, type StatusTrilhaUsuario } from "../prisma/generated/prisma";

export class TrilhaUsuarioRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async buscarPorId(id: string): Promise<TrilhaUsuario | null> {
    return await this.prisma.trilhaUsuario.findUnique({
      where: { id },
    });
  }

  async buscarPorUsuarioETrilha(
    usuarioId: string,
    trilhaId: string
  ): Promise<TrilhaUsuario | null> {
    return await this.prisma.trilhaUsuario.findUnique({
      where: {
        usuarioId_trilhaId: {
          usuarioId,
          trilhaId,
        },
      },
    });
  }

  async listarPorUsuario(
    usuarioId: string
  ): Promise<TrilhaUsuario[]> {
    return await this.prisma.trilhaUsuario.findMany({
      where: { usuarioId },
      orderBy: {
        iniciadaEm: "desc",
      },
    });
  }

  async listarPorTrilha(
    trilhaId: string
  ): Promise<TrilhaUsuario[]> {
    return await this.prisma.trilhaUsuario.findMany({
      where: { trilhaId },
      orderBy: {
        iniciadaEm: "desc",
      },
    });
  }

  async listarPorStatus(
    status: StatusTrilhaUsuario
  ): Promise<TrilhaUsuario[]> {
    return await this.prisma.trilhaUsuario.findMany({
      where: { status },
      orderBy: {
        percentualConclusao: "desc",
      },
    });
  }
}