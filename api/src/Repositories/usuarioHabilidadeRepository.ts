import type { PrismaClient, HabilidadeUsuario } from "../prisma/generated/client";
import { prisma } from "../prisma/prisma";

export class UsuarioHabilidadeRepository {
  constructor(private readonly prisma: PrismaClient) {
    this.prisma;
  }

  // =========================
  // LEITURA
  // =========================

  async listarTodos(): Promise<HabilidadeUsuario[]> {
    try {
      return await this.prisma.habilidadeUsuario.findMany({
        orderBy: {
          id: "asc",
        },
      });
    } catch (error) {
      console.error("Erro ao listar habilidades do usuário:", error);
      throw new Error("Não foi possível listar as habilidades do usuário.");
    }
  }

  async buscarPorId(id: number): Promise<HabilidadeUsuario | null> {
    try {
      return await this.prisma.habilidadeUsuario.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      console.error("Erro ao buscar habilidade do usuário por ID:", error);
      throw new Error("Não foi possível buscar o registro.");
    }
  }

  async buscarPorUsuarioEHabilidade(
    usuarioId: number,
    habilidadeId: number
  ): Promise<HabilidadeUsuario | null> {
    try {
      return await this.prisma.habilidadeUsuario.findUnique({
        where: {
          usuarioId_habilidadeId: {
            usuarioId,
            habilidadeId,
          },
        },
      });
    } catch (error) {
      console.error("Erro ao buscar habilidade do usuário composta:", error);
      throw new Error("Não foi possível buscar o registro.");
    }
  }

  // =========================
  // UPDATE / PROGRESSO
  // =========================

  async atualizarProgresso(
    usuarioId: number,
    habilidadeId: number,
    data: Partial<HabilidadeUsuario>
  ): Promise<HabilidadeUsuario> {
    try {
      return await this.prisma.habilidadeUsuario.update({
        where: {
          usuarioId_habilidadeId: {
            usuarioId,
            habilidadeId,
          },
        },
        data,
      });
    } catch (error) {
      console.error("Erro ao atualizar progresso da habilidade:", error);
      throw new Error("Não foi possível atualizar o progresso da habilidade.");
    }
  }

  async incrementarPontuacao(
    usuarioId: number,
    habilidadeId: number,
    pontos: number
  ): Promise<HabilidadeUsuario> {
    try {
      return await this.prisma.habilidadeUsuario.update({
        where: {
          usuarioId_habilidadeId: {
            usuarioId,
            habilidadeId,
          },
        },
        data: {
          pontuacao: {
            increment: pontos,
          },
        },
      });
    } catch (error) {
      console.error("Erro ao incrementar pontuação da habilidade:", error);
      throw new Error("Não foi possível incrementar a pontuação.");
    }
  }

  async subirNivel(
    usuarioId: number,
    habilidadeId: number,
    incremento?: number
  ): Promise<HabilidadeUsuario> {
    try {
      return await this.prisma.habilidadeUsuario.update({
        where: {
          usuarioId_habilidadeId: {
            usuarioId,
            habilidadeId,
          },
        },
        data: {
          nivel: {
            increment: incremento ?? 1,
          },
        },
      });
    } catch (error) {
      console.error("Erro ao subir nível da habilidade:", error);
      throw new Error("Não foi possível atualizar o nível da habilidade.");
    }
  }

  async resetarProgresso(
    usuarioId: number,
    habilidadeId: number
  ): Promise<HabilidadeUsuario> {
    try {
      return await this.prisma.habilidadeUsuario.update({
        where: {
          usuarioId_habilidadeId: {
            usuarioId,
            habilidadeId,
          },
        },
        data: {
          pontuacao: 0,
          nivel: 1,
        },
      });
    } catch (error) {
      console.error("Erro ao resetar progresso da habilidade:", error);
      throw new Error("Não foi possível resetar o progresso.");
    }
  }
}

export const usuarioHabilidadeRepository = new UsuarioHabilidadeRepository(prisma);