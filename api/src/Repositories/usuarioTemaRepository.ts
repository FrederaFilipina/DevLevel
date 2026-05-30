import { PrismaClient, type TemaUsuario, type NivelDificuldade } from "../prisma/generated/prisma";

export class TemaUsuarioRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async buscarPorId(id: string): Promise<TemaUsuario | null> {
    return await this.prisma.temaUsuario.findUnique({
      where: { id },
    });
  }

  async buscarPorUsuarioETema(
    usuarioId: string,
    temaId: string
  ): Promise<TemaUsuario | null> {
    return await this.prisma.temaUsuario.findUnique({
      where: {
        usuarioId_temaId: {
          usuarioId,
          temaId,
        },
      },
    });
  }

  async listarPorUsuario(
    usuarioId: string
  ): Promise<TemaUsuario[]> {
    return await this.prisma.temaUsuario.findMany({
      where: { usuarioId },
      orderBy: {
        pontuacaoTotal: "desc",
      },
    });
  }

  async listarPorTema(
    temaId: string
  ): Promise<TemaUsuario[]> {
    return await this.prisma.temaUsuario.findMany({
      where: { temaId },
      orderBy: {
        pontuacaoTotal: "desc",
      },
    });
  }

  async listarPorNivel(
    nivel: NivelDificuldade
  ): Promise<TemaUsuario[]> {
    return await this.prisma.temaUsuario.findMany({
      where: {
        nivelAtual: nivel,
      },
      orderBy: {
        pontuacaoTotal: "desc",
      },
    });
  }
}