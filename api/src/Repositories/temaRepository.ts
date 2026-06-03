import type { PrismaClient, Tema } from "../prisma/generated/client";
import { prisma } from "../prisma/prisma";

export class TemaRepository {
  constructor(private readonly prisma: PrismaClient) {
    this.prisma;
  }

  async listarTodos(): Promise<Tema[]> {
    try {
      return await this.prisma.tema.findMany({
        orderBy: {
          nome: "asc",
        },
      });
    } catch (error) {
      console.error("Erro ao listar temas:", error);
      throw new Error("Não foi possível listar os temas.");
    }
  }

  async buscarPorId(id: number): Promise<Tema | null> {
    try {
      return await this.prisma.tema.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      console.error("Erro ao buscar tema por ID:", error);
      throw new Error("Não foi possível buscar o tema.");
    }
  }

  async buscarPorNome(nome: string): Promise<Tema | null> {
    try {
      return await this.prisma.tema.findUnique({
        where: {
          nome,
        },
      });
    } catch (error) {
      console.error("Erro ao buscar tema por nome:", error);
      throw new Error("Não foi possível buscar o tema.");
    }
  }
}

export const temaRepository = new TemaRepository(prisma);