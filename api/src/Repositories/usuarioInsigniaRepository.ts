import { PrismaClient, type InsigniaUsuario } from "../prisma/generated/prisma";

export class InsigniaUsuarioRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async buscarPorId(id: string): Promise<InsigniaUsuario | null> {
    return await this.prisma.insigniaUsuario.findUnique({
      where: { id },
    });
  }

  async buscarPorUsuarioEInsignia(
    usuarioId: string,
    insigniaId: string
  ): Promise<InsigniaUsuario | null> {
    return await this.prisma.insigniaUsuario.findUnique({
      where: {
        usuarioId_insigniaId: {
          usuarioId,
          insigniaId,
        },
      },
    });
  }

  async listarPorUsuario(
    usuarioId: string
  ): Promise<InsigniaUsuario[]> {
    return await this.prisma.insigniaUsuario.findMany({
      where: { usuarioId },
      orderBy: {
        desbloqueadaEm: "desc",
      },
    });
  }

  async listarPorInsignia(
    insigniaId: string
  ): Promise<InsigniaUsuario[]> {
    return await this.prisma.insigniaUsuario.findMany({
      where: { insigniaId },
      orderBy: {
        desbloqueadaEm: "desc",
      },
    });
  }

  async listarPorTema(
    temaId: string
  ): Promise<InsigniaUsuario[]> {
    return await this.prisma.insigniaUsuario.findMany({
      where: { temaId },
      orderBy: {
        desbloqueadaEm: "desc",
      },
    });
  }

  async listarPorTrilha(
    trilhaId: string
  ): Promise<InsigniaUsuario[]> {
    return await this.prisma.insigniaUsuario.findMany({
      where: { trilhaId },
      orderBy: {
        desbloqueadaEm: "desc",
      },
    });
  }

  async listarTodos(): Promise<InsigniaUsuario[]> {
    return await this.prisma.insigniaUsuario.findMany({
      orderBy: {
        desbloqueadaEm: "desc",
      },
    });
  }
}