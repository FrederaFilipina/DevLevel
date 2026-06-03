import { PrismaClient, type TrilhaUsuario, type StatusTrilhaUsuario } from "../prisma/generated/prisma/client";

export class TrilhaUsuarioRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async buscarPorId(id: number): Promise<TrilhaUsuario | null> {
    return await this.prisma.trilhaUsuario.findUnique({
      where: { id },
    });
  }

  async buscarPorUsuarioETrilha(
    usuarioId: number,
    trilhaId: number
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
    usuarioId: number
  ): Promise<TrilhaUsuario[]> {
    return await this.prisma.trilhaUsuario.findMany({
      where: { usuarioId },
      orderBy: {
        iniciadaEm: "desc",
      },
    });
  }

  async listarPorTrilha(
    trilhaId: number
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