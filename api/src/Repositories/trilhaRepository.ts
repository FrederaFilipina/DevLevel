import type { PrismaClient, Trilha } from "../prisma/generated/client";
import { prisma } from "../prisma/prisma";

export class TrilhaRepository {
  constructor(private readonly prisma: PrismaClient) {
    this.prisma;
  }

  async listarTodas(): Promise<Trilha[]> {
    try {
      return await this.prisma.trilha.findMany({
        orderBy: {
          ordem: "asc",
        },
      });
    } catch (error) {
      console.error("Erro ao listar trilhas:", error);
      throw new Error("Não foi possível listar as trilhas.");
    }
  }

  async buscarPorId(id: number): Promise<Trilha | null> {
    try {
      return await this.prisma.trilha.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      console.error("Erro ao buscar trilha por ID:", error);
      throw new Error("Não foi possível buscar a trilha.");
    }
  }

  async listarPorTema(temaId: number): Promise<Trilha[]> {
    try {
      return await this.prisma.trilha.findMany({
        where: {
          temaId,
        },
        orderBy: {
          ordem: "asc",
        },
      });
    } catch (error) {
      console.error("Erro ao listar trilhas por tema:", error);
      throw new Error("Não foi possível listar as trilhas do tema.");
    }
  }

  async buscarPorTemaEOrdem(
    temaId: number,
    ordem: number
  ): Promise<Trilha | null> {
    try {
      return await this.prisma.trilha.findFirst({
        where: {
          temaId,
          ordem,
        },
      });
    } catch (error) {
      console.error("Erro ao buscar trilha por tema e ordem:", error);
      throw new Error("Não foi possível buscar a trilha.");
    }
  }

  // =========================
  // NOVO: buscar trilha com regras de desbloqueio
  // =========================
  async buscarComDependencias(id: number): Promise<Trilha | null> {
    try {
      return await this.prisma.trilha.findUnique({
        where: { id },
        include: {
          trilhaAnterior: true,
          proximasTrilhas: true,
        },
      });
    } catch (error) {
      console.error("Erro ao buscar trilha com dependências:", error);
      throw new Error("Não foi possível buscar a trilha com dependências.");
    }
  }

  // =========================
  // NOVO: listar com regras completas (para service de progressão)
  // =========================
  async listarComRegrasPorTema(temaId: number): Promise<Trilha[]> {
    try {
      return await this.prisma.trilha.findMany({
        where: {
          temaId,
        },
        orderBy: {
          ordem: "asc",
        },
        include: {
          trilhaAnterior: true,
        },
      });
    } catch (error) {
      console.error("Erro ao listar trilhas com regras:", error);
      throw new Error("Não foi possível listar as trilhas com regras.");
    }
  }
}

export const trilhaRepository = new TrilhaRepository(prisma);