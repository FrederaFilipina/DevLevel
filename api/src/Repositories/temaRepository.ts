import { PrismaClient, type Tema } from "@prisma/client";

export class TemaRepository {
  constructor(private prisma: PrismaClient) {}

  async criar(dados: Omit<Tema, "id" | "createdAt" | "updatedAt">): Promise<Tema> {
    return await this.prisma.tema.create({
      data: dados,
    });
  }

  async buscarPorId(id: string): Promise<Tema | null> {
    return await this.prisma.tema.findUnique({
      where: { id },
    });
  }

  async buscarTodos(): Promise<Tema[]> {
    return await this.prisma.tema.findMany();
  }

  async atualizar(id: string, dados: Partial<Tema>): Promise<Tema> {
    return await this.prisma.tema.update({
      where: { id },
      data: dados,
    });
  }

  async deletar(id: string): Promise<boolean> {
    await this.prisma.tema.delete({
      where: { id },
    });
    return true;
  }
}