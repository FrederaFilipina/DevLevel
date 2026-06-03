import type {
  PrismaClient,
  Tema,
} from "../prisma/generated/prisma/client";

export class TemaRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async listarTodos(): Promise<Tema[]> {
    return await this.prisma.tema.findMany({
      orderBy: {
        nome: "asc",
      },
    });
  }

  async buscarPorId(id: number): Promise<Tema | null> {
    return await this.prisma.tema.findUnique({
      where: {
        id,
      },
    });
  }

  async buscarPorNome(nome: string): Promise<Tema | null> {
    return await this.prisma.tema.findUnique({
      where: {
        nome,
      },
    });
  }
}