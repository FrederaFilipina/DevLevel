import type { PrismaClient, Conquista } from "../prisma/generated/client";
import { prisma } from "../prisma/prisma";

export class ConquistaRepository {
  constructor(private readonly prisma: PrismaClient) {
    this.prisma;
  }

  async listarTodas(): Promise<Conquista[]> {
    try {
      return await this.prisma.conquista.findMany({
        orderBy: {
          id: "asc",
        },
      });
    } catch (error) {
      console.error("Erro ao listar conquistas:", error);
      throw new Error("Não foi possível listar as conquistas.");
    }
  }

  async buscarPorId(id: number): Promise<Conquista | null> {
    try {
      return await this.prisma.conquista.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      console.error("Erro ao buscar conquista por ID:", error);
      throw new Error("Não foi possível buscar a conquista.");
    }
  }

  async buscarPorTitulo(titulo: string): Promise<Conquista | null> {
    try {
      return await this.prisma.conquista.findUnique({
        where: {
          titulo,
        },
      });
    } catch (error) {
      console.error("Erro ao buscar conquista por título:", error);
      throw new Error("Não foi possível buscar a conquista.");
    }
  }

  async listarOrdenadasPorXp(): Promise<Conquista[]> {
    try {
      return await this.prisma.conquista.findMany({
        orderBy: {
          xpRecompensa: "asc",
        },
      });
    } catch (error) {
      console.error("Erro ao listar conquistas por XP:", error);
      throw new Error("Não foi possível listar as conquistas por XP.");
    }
  }
}

export const conquistaRepository = new ConquistaRepository(prisma);