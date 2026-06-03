import type { PrismaClient, TrilhaUsuario } from "../prisma/generated/client";
import { prisma } from "../prisma/prisma";

export class UsuarioTrilhaRepository {
  constructor(private readonly prisma: PrismaClient) {
    this.prisma;
  }

  // =========================
  // LEITURA
  // =========================

  async listarTodos(): Promise<TrilhaUsuario[]> {
    try {
      return await this.prisma.trilhaUsuario.findMany({
        orderBy: {
          id: "asc",
        },
        include: {
          trilha: true,
        },
      });
    } catch (error) {
      console.error("Erro ao listar trilha-usuário:", error);
      throw new Error("Não foi possível listar os registros de trilha do usuário.");
    }
  }

  async buscarPorId(id: number): Promise<TrilhaUsuario | null> {
    try {
      return await this.prisma.trilhaUsuario.findUnique({
        where: {
          id,
        },
        include: {
          trilha: true,
        },
      });
    } catch (error) {
      console.error("Erro ao buscar trilha-usuário por ID:", error);
      throw new Error("Não foi possível buscar o registro.");
    }
  }

  async buscarPorUsuarioETrilha(
    usuarioId: number,
    trilhaId: number
  ): Promise<TrilhaUsuario | null> {
    try {
      return await this.prisma.trilhaUsuario.findUnique({
        where: {
          usuarioId_trilhaId: {
            usuarioId,
            trilhaId,
          },
        },
        include: {
          trilha: true,
        },
      });
    } catch (error) {
      console.error("Erro ao buscar trilha-usuário composto:", error);
      throw new Error("Não foi possível buscar o registro.");
    }
  }

  // =========================
  // UPDATE / PROGRESSO
  // =========================

  async atualizarProgresso(
    usuarioId: number,
    trilhaId: number,
    data: Partial<TrilhaUsuario>
  ): Promise<TrilhaUsuario> {
    try {
      return await this.prisma.trilhaUsuario.update({
        where: {
          usuarioId_trilhaId: {
            usuarioId,
            trilhaId,
          },
        },
        data,
      });
    } catch (error) {
      console.error("Erro ao atualizar progresso da trilha:", error);
      throw new Error("Não foi possível atualizar o progresso da trilha.");
    }
  }

  async atualizarStatus(
    usuarioId: number,
    trilhaId: number,
    status: TrilhaUsuario["status"]
  ): Promise<TrilhaUsuario> {
    try {
      return await this.prisma.trilhaUsuario.update({
        where: {
          usuarioId_trilhaId: {
            usuarioId,
            trilhaId,
          },
        },
        data: {
          status,
        },
      });
    } catch (error) {
      console.error("Erro ao atualizar status da trilha:", error);
      throw new Error("Não foi possível atualizar o status da trilha.");
    }
  }

  async atualizarProgressoNumerico(
    usuarioId: number,
    trilhaId: number,
    dados: {
      pontuacaoAtual?: number;
      percentualConclusao?: number;
      moduloAtualId?: number;
      questaoAtualId?: number;
      podeDesbloquear?: boolean;
      desbloqueadaPorTrilhaId?: number;
    }
  ): Promise<TrilhaUsuario> {
    try {
      return await this.prisma.trilhaUsuario.update({
        where: {
          usuarioId_trilhaId: {
            usuarioId,
            trilhaId,
          },
        },
        data: dados,
      });
    } catch (error) {
      console.error("Erro ao atualizar progresso numérico da trilha:", error);
      throw new Error("Não foi possível atualizar o progresso da trilha.");
    }
  }

  async concluirTrilha(
    usuarioId: number,
    trilhaId: number
  ): Promise<TrilhaUsuario> {
    try {
      return await this.prisma.trilhaUsuario.update({
        where: {
          usuarioId_trilhaId: {
            usuarioId,
            trilhaId,
          },
        },
        data: {
          status: "CONCLUIDA",
          concluidaEm: new Date(),
          percentualConclusao: 100,
          podeDesbloquear: true,
        },
      });
    } catch (error) {
      console.error("Erro ao concluir trilha:", error);
      throw new Error("Não foi possível concluir a trilha.");
    }
  }
}

export const usuarioTrilhaRepository = new UsuarioTrilhaRepository(prisma);