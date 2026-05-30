import { PrismaClient, type HabilidadeUsuario } from "../prisma/generated/prisma";

export class HabilidadeUsuarioRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async buscarPorId(id: string): Promise<HabilidadeUsuario | null> {
    return await this.prisma.habilidadeUsuario.findUnique({
      where: { id },
    });
  }

  async buscarPorUsuarioEHabilidade(
    usuarioId: string,
    habilidadeId: string
  ): Promise<HabilidadeUsuario | null> {
    return await this.prisma.habilidadeUsuario.findUnique({
      where: {
        usuarioId_habilidadeId: {
          usuarioId,
          habilidadeId,
        },
      },
    });
  }

  async listarPorUsuario(
    usuarioId: string
  ): Promise<HabilidadeUsuario[]> {
    return await this.prisma.habilidadeUsuario.findMany({
      where: { usuarioId },
      orderBy: {
        nivel: "desc",
      },
    });
  }

  async listarPorHabilidade(
    habilidadeId: string
  ): Promise<HabilidadeUsuario[]> {
    return await this.prisma.habilidadeUsuario.findMany({
      where: { habilidadeId },
      orderBy: {
        pontuacao: "desc",
      },
    });
  }

  async listarPorNivel(
    nivel: number
  ): Promise<HabilidadeUsuario[]> {
    return await this.prisma.habilidadeUsuario.findMany({
      where: { nivel },
      orderBy: {
        pontuacao: "desc",
      },
    });
  }
}