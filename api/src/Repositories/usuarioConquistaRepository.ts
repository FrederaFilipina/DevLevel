import type { PrismaClient, ConquistaUsuario } from "../prisma/generated/client";

export class ConquistaUsuarioRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async buscarPorId(id: number): Promise<ConquistaUsuario | null> {
    return await this.prisma.conquistaUsuario.findUnique({
      where: { id },
    });
  }

  async buscarPorUsuarioEConquista(
    usuarioId: number,
    conquistaId: number
  ): Promise<ConquistaUsuario | null> {
    return await this.prisma.conquistaUsuario.findFirst({
      where: {
        usuarioId,
        conquistaId,
      },
    });
  }

  async listarPorUsuario(
    usuarioId: number
  ): Promise<ConquistaUsuario[]> {
    return await this.prisma.conquistaUsuario.findMany({
      where: { usuarioId },
      orderBy: {
        desbloqueadaEm: "desc",
      },
    });
  }

  async listarPorConquista(
    conquistaId: number
  ): Promise<ConquistaUsuario[]> {
    return await this.prisma.conquistaUsuario.findMany({
      where: { conquistaId },
      orderBy: {
        desbloqueadaEm: "desc",
      },
    });
  }

  async listarTodos(): Promise<ConquistaUsuario[]> {
    return await this.prisma.conquistaUsuario.findMany({
      orderBy: {
        desbloqueadaEm: "desc",
      },
    });
  }
}