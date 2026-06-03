import z from "zod";
import type { HabilidadeUsuario } from "../prisma/generated/client";
import {
  usuarioHabilidadeRepository,
  UsuarioHabilidadeRepository,
} from "../repositories/usuarioHabilidadeRepository";

export class UsuarioHabilidadeService {
  constructor(private readonly repository: UsuarioHabilidadeRepository) {}

  // =========================
  // LEITURA
  // =========================

  async listarTodos(): Promise<HabilidadeUsuario[]> {
    try {
      return await this.repository.listarTodos();
    } catch (error) {
      console.error("Erro no service ao listar habilidades do usuário:", error);
      throw new Error("Não foi possível listar as habilidades do usuário.");
    }
  }

  async buscarPorId(id: number): Promise<HabilidadeUsuario | null> {
    const schema = z.number().int().positive("ID inválido");
    const idValidated = schema.parse(id);

    try {
      return await this.repository.buscarPorId(idValidated);
    } catch (error) {
      console.error(
        "Erro no service ao buscar habilidade do usuário por ID:",
        error
      );
      throw new Error("Não foi possível buscar o registro.");
    }
  }

  async buscarPorUsuarioEHabilidade(
    usuarioId: number,
    habilidadeId: number
  ): Promise<HabilidadeUsuario | null> {
    const schema = z.object({
      usuarioId: z.number().int().positive("UsuarioId inválido"),
      habilidadeId: z.number().int().positive("HabilidadeId inválido"),
    });

    const validated = schema.parse({ usuarioId, habilidadeId });

    try {
      return await this.repository.buscarPorUsuarioEHabilidade(
        validated.usuarioId,
        validated.habilidadeId
      );
    } catch (error) {
      console.error(
        "Erro no service ao buscar habilidade do usuário (composta):",
        error
      );
      throw new Error("Não foi possível buscar o registro.");
    }
  }

  // =========================
  // PROGRESSO
  // =========================

  async atualizarProgresso(
    usuarioId: number,
    habilidadeId: number,
    data: Partial<HabilidadeUsuario>
  ): Promise<HabilidadeUsuario> {
    const schema = z.object({
      usuarioId: z.number().int().positive("UsuarioId inválido"),
      habilidadeId: z.number().int().positive("HabilidadeId inválido"),
    });

    schema.parse({ usuarioId, habilidadeId });

    try {
      return await this.repository.atualizarProgresso(
        usuarioId,
        habilidadeId,
        data
      );
    } catch (error) {
      console.error(
        "Erro no service ao atualizar progresso da habilidade:",
        error
      );
      throw new Error("Não foi possível atualizar o progresso da habilidade.");
    }
  }

  async incrementarPontuacao(
    usuarioId: number,
    habilidadeId: number,
    pontos: number
  ): Promise<HabilidadeUsuario> {
    const schema = z.object({
      usuarioId: z.number().int().positive("UsuarioId inválido"),
      habilidadeId: z.number().int().positive("HabilidadeId inválido"),
      pontos: z.number().int().positive("Pontos inválidos"),
    });

    const validated = schema.parse({ usuarioId, habilidadeId, pontos });

    try {
      return await this.repository.incrementarPontuacao(
        validated.usuarioId,
        validated.habilidadeId,
        validated.pontos
      );
    } catch (error) {
      console.error(
        "Erro no service ao incrementar pontuação da habilidade:",
        error
      );
      throw new Error("Não foi possível incrementar a pontuação.");
    }
  }

  async subirNivel(
    usuarioId: number,
    habilidadeId: number,
    incremento?: number
  ): Promise<HabilidadeUsuario> {
    const schema = z.object({
      usuarioId: z.number().int().positive("UsuarioId inválido"),
      habilidadeId: z.number().int().positive("HabilidadeId inválido"),
      incremento: z.number().int().positive().optional(),
    });

    const validated = schema.parse({
      usuarioId,
      habilidadeId,
      incremento,
    });

    try {
      return await this.repository.subirNivel(
        validated.usuarioId,
        validated.habilidadeId,
        validated.incremento
      );
    } catch (error) {
      console.error("Erro no service ao subir nível da habilidade:", error);
      throw new Error("Não foi possível atualizar o nível da habilidade.");
    }
  }

  async resetarProgresso(
    usuarioId: number,
    habilidadeId: number
  ): Promise<HabilidadeUsuario> {
    const schema = z.object({
      usuarioId: z.number().int().positive("UsuarioId inválido"),
      habilidadeId: z.number().int().positive("HabilidadeId inválido"),
    });

    const validated = schema.parse({ usuarioId, habilidadeId });

    try {
      return await this.repository.resetarProgresso(
        validated.usuarioId,
        validated.habilidadeId
      );
    } catch (error) {
      console.error(
        "Erro no service ao resetar progresso da habilidade:",
        error
      );
      throw new Error("Não foi possível resetar o progresso.");
    }
  }
}

export const usuarioHabilidadeService = new UsuarioHabilidadeService(
  usuarioHabilidadeRepository
);