import type { PrismaClient, ConquistaUsuario } from "../prisma/generated/client";
import { prisma } from "../prisma/prisma";

export class UsuarioConquistaRepository {
  constructor(private readonly prisma: PrismaClient) {
    this.prisma;
  }

  // =========================
  // LEITURA
  // =========================

  async listarTodos(): Promise<ConquistaUsuario[]> {
    try {
      return await this.prisma.conquistaUsuario.findMany({
        orderBy: {
          id: "asc",
        },
      });
    } catch (error) {
      console.error("Erro ao listar conquistas do usuário:", error);
      throw new Error("Não foi possível listar as conquistas do usuário.");
    }
  }

  async buscarPorId(id: number): Promise<ConquistaUsuario | null> {
    try {
      return await this.prisma.conquistaUsuario.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      console.error("Erro ao buscar conquista do usuário por ID:", error);
      throw new Error("Não foi possível buscar o registro.");
    }
  }

  async buscarPorUsuarioEConquista(
    usuarioId: number,
    conquistaId: number
  ): Promise<ConquistaUsuario | null> {
    try {
      return await this.prisma.conquistaUsuario.findFirst({
        where: {
          usuarioId,
          conquistaId,
        },
      });
    } catch (error) {
      console.error("Erro ao buscar conquista do usuário composta:", error);
      throw new Error("Não foi possível buscar o registro.");
    }
  }

  // =========================
  // UPDATE / DESBLOQUEIO
  // =========================

  async desbloquearConquista(
    usuarioId: number,
    conquistaId: number
  ): Promise<ConquistaUsuario> {
    try {
      return await this.prisma.conquistaUsuario.create({
        data: {
          usuarioId,
          conquistaId,
          desbloqueadaEm: new Date(),
        },
      });
    } catch (error) {
      console.error("Erro ao desbloquear conquista:", error);
      throw new Error("Não foi possível desbloquear a conquista.");
    }
  }

  async atualizarDesbloqueio(
    usuarioId: number,
    conquistaId: number,
    data: Partial<ConquistaUsuario>
  ): Promise<ConquistaUsuario> {
    try {
      return await this.prisma.conquistaUsuario.update({
        where: {
          usuarioId_conquistaId: {
            usuarioId,
            conquistaId,
          },
        },
        data,
      });
    } catch (error) {
      console.error("Erro ao atualizar conquista do usuário:", error);
      throw new Error("Não foi possível atualizar a conquista.");
    }
  }

  async verificarSeDesbloqueada(
    usuarioId: number,
    conquistaId: number
  ): Promise<boolean> {
    try {
      const conquista = await this.prisma.conquistaUsuario.findFirst({
        where: {
          usuarioId,
          conquistaId,
        },
      });

      return !!conquista;
    } catch (error) {
      console.error("Erro ao verificar conquista:", error);
      throw new Error("Não foi possível verificar a conquista.");
    }
  }
}

export const usuarioConquistaRepository = new UsuarioConquistaRepository(prisma);