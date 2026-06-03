import { PrismaClient, type HabilidadeUsuario } from "../prisma/generated/prisma/client";

export class HabilidadeUsuarioRepository {
  constructor(private readonly prisma: PrismaClient) { }

  async buscarPorId(id: number): Promise<HabilidadeUsuario | null> {
    return await this.prisma.habilidadeUsuario.findUnique({
      where: { id },
    });
  }

  async buscarPorUsuarioEHabilidade(
    usuarioId: number,
    habilidadeId: number
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
    usuarioId: number
  ): Promise<HabilidadeUsuario[]> {
    return await this.prisma.habilidadeUsuario.findMany({
      where: { usuarioId },
      orderBy: {
        nivel: "desc",
      },
    });
  }

  async listarPorHabilidade(
    habilidadeId: number
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