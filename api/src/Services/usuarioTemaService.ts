import z from "zod";
import type { TemaUsuario } from "../prisma/generated/client";
import {
  usuarioTemaRepository,
  UsuarioTemaRepository,
} from "../repositories/usuarioTemaRepository";

export class UsuarioTemaService {
  constructor(private readonly repository: UsuarioTemaRepository) {}

  // =========================
  // LEITURA
  // =========================

  async listarTodos(): Promise<TemaUsuario[]> {
    try {
      return await this.repository.listarTodos();
    } catch (error) {
      console.error("Erro no service ao listar temas do usuário:", error);
      throw new Error(
        "Não foi possível listar os registros de tema do usuário."
      );
    }
  }

  async buscarPorId(id: number): Promise<TemaUsuario | null> {
    const schema = z.number().int().positive("ID inválido");
    const idValidated = schema.parse(id);

    try {
      return await this.repository.buscarPorId(idValidated);
    } catch (error) {
      console.error(
        "Erro no service ao buscar tema do usuário por ID:",
        error
      );
      throw new Error("Não foi possível buscar o registro.");
    }
  }

  async buscarPorUsuarioETema(
    usuarioId: number,
    temaId: number
  ): Promise<TemaUsuario | null> {
    const schema = z.object({
      usuarioId: z.number().int().positive("UsuarioId inválido"),
      temaId: z.number().int().positive("TemaId inválido"),
    });

    const validated = schema.parse({ usuarioId, temaId });

    try {
      return await this.repository.buscarPorUsuarioETema(
        validated.usuarioId,
        validated.temaId
      );
    } catch (error) {
      console.error(
        "Erro no service ao buscar tema-usuário composto:",
        error
      );
      throw new Error("Não foi possível buscar o registro.");
    }
  }

  // =========================
  // PROGRESSO DO TEMA
  // =========================

  async atualizarProgresso(
    usuarioId: number,
    temaId: number,
    data: Partial<TemaUsuario>
  ): Promise<TemaUsuario> {
    const schema = z.object({
      usuarioId: z.number().int().positive("UsuarioId inválido"),
      temaId: z.number().int().positive("TemaId inválido"),
    });

    schema.parse({ usuarioId, temaId });

    try {
      return await this.repository.atualizarProgresso(
        usuarioId,
        temaId,
        data
      );
    } catch (error) {
      console.error(
        "Erro no service ao atualizar progresso do tema:",
        error
      );
      throw new Error(
        "Não foi possível atualizar o progresso do tema."
      );
    }
  }

  async incrementarPontuacao(
    usuarioId: number,
    temaId: number,
    pontos: number
  ): Promise<TemaUsuario> {
    const schema = z.object({
      usuarioId: z.number().int().positive("UsuarioId inválido"),
      temaId: z.number().int().positive("TemaId inválido"),
      pontos: z.number().int().positive("Pontos inválidos"),
    });

    const validated = schema.parse({ usuarioId, temaId, pontos });

    try {
      return await this.repository.incrementarPontuacao(
        validated.usuarioId,
        validated.temaId,
        validated.pontos
      );
    } catch (error) {
      console.error(
        "Erro no service ao incrementar pontuação do tema:",
        error
      );
      throw new Error("Não foi possível atualizar a pontuação.");
    }
  }

  async incrementarTrilhasConcluidas(
    usuarioId: number,
    temaId: number
  ): Promise<TemaUsuario> {
    const schema = z.object({
      usuarioId: z.number().int().positive("UsuarioId inválido"),
      temaId: z.number().int().positive("TemaId inválido"),
    });

    const validated = schema.parse({ usuarioId, temaId });

    try {
      return await this.repository.incrementarTrilhasConcluidas(
        validated.usuarioId,
        validated.temaId
      );
    } catch (error) {
      console.error(
        "Erro no service ao incrementar trilhas concluídas:",
        error
      );
      throw new Error(
        "Não foi possível atualizar trilhas concluídas."
      );
    }
  }
}

export const usuarioTemaService = new UsuarioTemaService(
  usuarioTemaRepository
);