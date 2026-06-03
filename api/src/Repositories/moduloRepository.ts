import type { PrismaClient, Modulo } from "../prisma/generated/client";
import { prisma } from "../prisma/prisma";

export class ModuloRepository {
  constructor(private readonly prisma: PrismaClient) {
    this.prisma;
  }

  async listarTodos(): Promise<Modulo[]> {
    try {
      return await this.prisma.modulo.findMany({
        orderBy: {
          ordem: "asc",
        },
      });
    } catch (error) {
      console.error("Erro ao listar módulos:", error);
      throw new Error("Não foi possível listar os módulos.");
    }
  }

  async buscarPorId(id: number): Promise<Modulo | null> {
    try {
      return await this.prisma.modulo.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      console.error("Erro ao buscar módulo por ID:", error);
      throw new Error("Não foi possível buscar o módulo.");
    }
  }

  async listarPorTrilha(trilhaId: number): Promise<Modulo[]> {
    try {
      return await this.prisma.modulo.findMany({
        where: {
          trilhaId,
        },
        orderBy: {
          ordem: "asc",
        },
      });
    } catch (error) {
      console.error("Erro ao listar módulos por trilha:", error);
      throw new Error("Não foi possível listar os módulos da trilha.");
    }
  }

  async buscarPorTrilhaEOrdem(
    trilhaId: number,
    ordem: number
  ): Promise<Modulo | null> {
    try {
      return await this.prisma.modulo.findFirst({
        where: {
          trilhaId,
          ordem,
        },
      });
    } catch (error) {
      console.error("Erro ao buscar módulo por trilha e ordem:", error);
      throw new Error("Não foi possível buscar o módulo.");
    }
  }
}

export const moduloRepository = new ModuloRepository(prisma);