import { PrismaClient, type Modulo } from "../prisma/generated/client";

export class ModuloRepository {
  constructor(private prisma: PrismaClient) {}

  async listarTodos(): Promise<Modulo[]> {
    return await this.prisma.modulo.findMany({
      orderBy: [
        { trilhaId: "asc" },
        { ordem: "asc" },
      ],
    });
  }

  async buscarPorId(id: number): Promise<Modulo | null> {
    return await this.prisma.modulo.findUnique({
      where: {
        id,
      },
    });
  }

  async listarPorTrilha(trilhaId: number): Promise<Modulo[]> {
    return await this.prisma.modulo.findMany({
      where: {
        trilhaId,
      },
      orderBy: {
        ordem: "asc",
      },
    });
  }

  async buscarPorTrilhaEOrdem(
    trilhaId: number,
    ordem: number
  ): Promise<Modulo | null> {
    return await this.prisma.modulo.findUnique({
      where: {
        trilhaId_ordem: {
          trilhaId,
          ordem,
        },
      },
    });
  }
}