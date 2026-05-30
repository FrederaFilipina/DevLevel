import type { PrismaClient, Tema } from "../prisma/generated/prisma";


export class TemaRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async buscarPorId(id: string): Promise<Tema | null> {
    return await this.prisma.tema.findUnique({
      where: { id },
    });
  }

  async buscarPorNome(nome: string): Promise<Tema | null> {
    return await this.prisma.tema.findUnique({
      where: { nome },
    });
  }

  async listarTodos(): Promise<Tema[]> {
    return await this.prisma.tema.findMany({
      orderBy: {
        nome: "asc",
      },
    });
  }
}