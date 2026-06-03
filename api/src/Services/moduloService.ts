import z from "zod";
import type { Modulo } from "../prisma/generated/client";
import { moduloRepository, ModuloRepository } from "../repositories/moduloRepository";

export class ModuloService {
  constructor(private readonly repository: ModuloRepository) {}

  async listarTodos(): Promise<Modulo[]> {
    try {
      return await this.repository.listarTodos();
    } catch (error) {
      console.error("Erro no service ao listar módulos:", error);
      throw new Error("Não foi possível listar os módulos.");
    }
  }

  async buscarPorId(id: number): Promise<Modulo | null> {
    const schema = z.number().int().positive("ID inválido");
    const idValidated = schema.parse(id);

    try {
      return await this.repository.buscarPorId(idValidated);
    } catch (error) {
      console.error("Erro no service ao buscar módulo por ID:", error);
      throw new Error("Não foi possível buscar o módulo.");
    }
  }

  async listarPorTrilha(trilhaId: number): Promise<Modulo[]> {
    const schema = z.number().int().positive("TrilhaId inválido");
    const trilhaIdValidated = schema.parse(trilhaId);

    try {
      return await this.repository.listarPorTrilha(trilhaIdValidated);
    } catch (error) {
      console.error("Erro no service ao listar módulos por trilha:", error);
      throw new Error("Não foi possível listar os módulos da trilha.");
    }
  }

  async buscarPorTrilhaEOrdem(
    trilhaId: number,
    ordem: number
  ): Promise<Modulo | null> {
    const schema = z.object({
      trilhaId: z.number().int().positive("TrilhaId inválido"),
      ordem: z.number().int().nonnegative("Ordem inválida"),
    });

    const validated = schema.parse({ trilhaId, ordem });

    try {
      return await this.repository.buscarPorTrilhaEOrdem(
        validated.trilhaId,
        validated.ordem
      );
    } catch (error) {
      console.error(
        "Erro no service ao buscar módulo por trilha e ordem:",
        error
      );
      throw new Error("Não foi possível buscar o módulo.");
    }
  }
}

export const moduloService = new ModuloService(moduloRepository);