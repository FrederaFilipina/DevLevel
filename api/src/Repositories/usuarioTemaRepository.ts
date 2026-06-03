import type { PrismaClient, TemaUsuario } from "../prisma/generated/client";
import { prisma } from "../prisma/prisma";

export class UsuarioTemaRepository {
  constructor(private readonly prisma: PrismaClient) {
    this.prisma;
  }

  async listarTodos(): Promise<TemaUsuario[]> {
    try {
      return await this.prisma.temaUsuario.findMany({
        orderBy: {
          id: "asc",
        },
      });
    } catch (error) {
      console.error("Erro ao listar tema-usuario:", error);
      throw new Error("Não foi possível listar os registros de tema do usuário.");
    }
  }

  async buscarPorId(id: number): Promise<TemaUsuario | null> {
    try {
      return await this.prisma.temaUsuario.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      console.error("Erro ao buscar tema-usuário por ID:", error);
      throw new Error("Não foi possível buscar o registro.");
    }
  }

  async buscarPorUsuarioETema(
    usuarioId: number,
    temaId: number
  ): Promise<TemaUsuario | null> {
    try {
      return await this.prisma.temaUsuario.findUnique({
        where: {
          usuarioId_temaId: {
            usuarioId,
            temaId,
          },
        },
      });
    } catch (error) {
      console.error("Erro ao buscar tema-usuário composto:", error);
      throw new Error("Não foi possível buscar o registro.");
    }
  }

  async atualizarProgresso(
    usuarioId: number,
    temaId: number,
    data: Partial<TemaUsuario>
  ): Promise<TemaUsuario> {
    try {
      return await this.prisma.temaUsuario.update({
        where: {
          usuarioId_temaId: {
            usuarioId,
            temaId,
          },
        },
        data,
      });
    } catch (error) {
      console.error("Erro ao atualizar progresso do tema:", error);
      throw new Error("Não foi possível atualizar o progresso do tema.");
    }
  }

  async incrementarPontuacao(
    usuarioId: number,
    temaId: number,
    pontos: number
  ): Promise<TemaUsuario> {
    try {
      return await this.prisma.temaUsuario.update({
        where: {
          usuarioId_temaId: {
            usuarioId,
            temaId,
          },
        },
        data: {
          pontuacaoTotal: {
            increment: pontos,
          },
        },
      });
    } catch (error) {
      console.error("Erro ao incrementar pontuação:", error);
      throw new Error("Não foi possível atualizar a pontuação.");
    }
  }

  async incrementarTrilhasConcluidas(
    usuarioId: number,
    temaId: number
  ): Promise<TemaUsuario> {
    try {
      return await this.prisma.temaUsuario.update({
        where: {
          usuarioId_temaId: {
            usuarioId,
            temaId,
          },
        },
        data: {
          trilhasConcluidas: {
            increment: 1,
          },
        },
      });
    } catch (error) {
      console.error("Erro ao incrementar trilhas concluídas:", error);
      throw new Error("Não foi possível atualizar trilhas concluídas.");
    }
  }
}

export const usuarioTemaRepository = new UsuarioTemaRepository(prisma);