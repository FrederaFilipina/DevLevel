import z from "zod";
import type { Questao } from "../prisma/generated/client";
import { questaoRepository, QuestaoRepository } from "../repositories/questaoRepository";

export class QuestaoService {
  constructor(private readonly repository: QuestaoRepository) {}

  async listarTodas(): Promise<Questao[]> {
    try {
      return await this.repository.listarTodas();
    } catch (error) {
      console.error("Erro no service ao listar questões:", error);
      throw new Error("Não foi possível listar as questões.");
    }
  }

  async buscarPorId(id: number): Promise<Questao | null> {
    const schema = z.number().int().positive("ID inválido");
    const idValidated = schema.parse(id);

    try {
      return await this.repository.buscarPorId(idValidated);
    } catch (error) {
      console.error("Erro no service ao buscar questão por ID:", error);
      throw new Error("Não foi possível buscar a questão.");
    }
  }

  async listarPorModulo(moduloId: number): Promise<Questao[]> {
    const schema = z.number().int().positive("ModuloId inválido");
    const moduloIdValidated = schema.parse(moduloId);

    try {
      return await this.repository.listarPorModulo(moduloIdValidated);
    } catch (error) {
      console.error("Erro no service ao listar questões por módulo:", error);
      throw new Error("Não foi possível listar as questões do módulo.");
    }
  }

  async buscarPorModuloEOrdem(moduloId: number, ordem: number): Promise<Questao | null> {
    const schema = z.object({
      moduloId: z.number().int().positive("ModuloId inválido"),
      ordem: z.number().int().nonnegative("Ordem inválida"),
    });

    const validated = schema.parse({ moduloId, ordem });

    try {
      return await this.repository.buscarPorModuloEOrdem(
        validated.moduloId,
        validated.ordem
      );
    } catch (error) {
      console.error(
        "Erro no service ao buscar questão por módulo e ordem:",
        error
      );
      throw new Error("Não foi possível buscar a questão.");
    }
  }
}

export const questaoService = new QuestaoService(questaoRepository);