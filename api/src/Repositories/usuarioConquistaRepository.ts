import { PrismaClient, type ConquistaUsuario } from "../prisma/generated/prisma";

export class ConquistaUsuarioRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async buscarPorId(id: string): Promise<ConquistaUsuario | null> {
    return await this.prisma.conquistaUsuario.findUnique({
      where: { id },
    });
  }

  async buscarPorUsuarioEConquista(
    usuarioId: string,
    conquistaId: string
  ): Promise<ConquistaUsuario | null> {
    return await this.prisma.conquistaUsuario.findFirst({
      where: {
        usuarioId,
        conquistaId,
      },
    });
  }

  async listarPorUsuario(
    usuarioId: string
  ): Promise<ConquistaUsuario[]> {
    return await this.prisma.conquistaUsuario.findMany({
      where: { usuarioId },
      orderBy: {
        desbloqueadaEm: "desc",
      },
    });
  }

  async listarPorConquista(
    conquistaId: string
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