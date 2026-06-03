import type { PrismaClient, Habilidade } from "../prisma/generated/client";
import { prisma } from "../prisma/prisma";

export class HabilidadeRepository {
  constructor(private readonly prisma: PrismaClient) {
    this.prisma;
  }

  async listarTodas(): Promise<Habilidade[]> {
    try {
      return await this.prisma.habilidade.findMany({
        orderBy: {
          nome: "asc",
        },
      });
    } catch (error) {
      console.error("Erro ao listar habilidades:", error);
      throw new Error("Não foi possível listar as habilidades.");
    }
  }

  async buscarPorId(id: number): Promise<Habilidade | null> {
    try {
      return await this.prisma.habilidade.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      console.error("Erro ao buscar habilidade por ID:", error);
      throw new Error("Não foi possível buscar a habilidade.");
    }
  }

  async buscarPorNome(nome: string): Promise<Habilidade | null> {
    try {
      return await this.prisma.habilidade.findUnique({
        where: {
          nome,
        },
      });
    } catch (error) {
      console.error("Erro ao buscar habilidade por nome:", error);
      throw new Error("Não foi possível buscar a habilidade.");
    }
  }
}

export const habilidadeRepository = new HabilidadeRepository(prisma);