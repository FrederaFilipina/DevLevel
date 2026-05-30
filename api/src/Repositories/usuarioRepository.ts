import { PrismaClient, type Usuario} from "@prisma/client";

export class UsuarioRepository {
  constructor(private prisma: PrismaClient) {}

  async criar(dados: Omit<Usuario, "id" | "createdAt" | "updatedAt">): Promise<Usuario> {
    return await this.prisma.usuario.create({
      data: dados,
    });
  }

  async buscarPorId(id: string): Promise<Usuario | null> {
    return await this.prisma.usuario.findUnique({
      where: { id },
    });
  }

  async buscarTodos(): Promise<Usuario[]> {
    return await this.prisma.usuario.findMany();
  }

  async atualizar(id: string, dados: Partial<Usuario>): Promise<Usuario> {
    return await this.prisma.usuario.update({
      where: { id },
      data: dados,
    });
  }

  async deletar(id: string): Promise<boolean> {
    await this.prisma.usuario.delete({
      where: { id },
    });
    return true;
  }
}