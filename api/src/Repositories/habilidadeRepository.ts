import { PrismaClient, type Habilidade } from "../prisma/generated/prisma";

export class HabilidadeRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async listarTodas(): Promise<Habilidade[]> {
    return await this.prisma.habilidade.findMany({
      orderBy: {
        nome: "asc",
      },
    });
  }

  async buscarPorId(id: string): Promise<Habilidade | null> {
    return await this.prisma.habilidade.findUnique({
      where: { id },
    });
  }

  async buscarPorNome(nome: string): Promise<Habilidade | null> {
    return await this.prisma.habilidade.findUnique({
      where: { nome },
    });
  }
}