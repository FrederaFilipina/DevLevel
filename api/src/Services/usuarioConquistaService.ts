import z from "zod";
import type { ConquistaUsuario } from "../prisma/generated/client";
import {
  usuarioConquistaRepository,
  UsuarioConquistaRepository,
} from "../repositories/usuarioConquistaRepository";

export class UsuarioConquistaService {
  constructor(private readonly repository: UsuarioConquistaRepository) {}

  // =========================
  // LEITURA
  // =========================

  async listarTodos(): Promise<ConquistaUsuario[]> {
    try {
      return await this.repository.listarTodos();
    } catch (error) {
      console.error("Erro no service ao listar conquistas do usuário:", error);
      throw new Error("Não foi possível listar as conquistas do usuário.");
    }
  }

  async buscarPorId(id: number): Promise<ConquistaUsuario | null> {
    const schema = z.number().int().positive("ID inválido");
    const idValidated = schema.parse(id);

    try {
      return await this.repository.buscarPorId(idValidated);
    } catch (error) {
      console.error("Erro no service ao buscar conquista do usuário por ID:", error);
      throw new Error("Não foi possível buscar o registro.");
    }
  }

  async buscarPorUsuarioEConquista(
    usuarioId: number,
    conquistaId: number
  ): Promise<ConquistaUsuario | null> {
    const schema = z.object({
      usuarioId: z.number().int().positive("UsuarioId inválido"),
      conquistaId: z.number().int().positive("ConquistaId inválido"),
    });

    const validated = schema.parse({ usuarioId, conquistaId });

    try {
      return await this.repository.buscarPorUsuarioEConquista(
        validated.usuarioId,
        validated.conquistaId
      );
    } catch (error) {
      console.error(
        "Erro no service ao buscar conquista do usuário (composta):",
        error
      );
      throw new Error("Não foi possível buscar o registro.");
    }
  }

  // =========================
  // DESBLOQUEIO / UPDATE
  // =========================

  async desbloquearConquista(
    usuarioId: number,
    conquistaId: number
  ): Promise<ConquistaUsuario> {
    const schema = z.object({
      usuarioId: z.number().int().positive("UsuarioId inválido"),
      conquistaId: z.number().int().positive("ConquistaId inválido"),
    });

    const validated = schema.parse({ usuarioId, conquistaId });

    try {
      const jaDesbloqueada =
        await this.repository.verificarSeDesbloqueada(
          validated.usuarioId,
          validated.conquistaId
        );

      if (jaDesbloqueada) {
        throw new Error("Conquista já desbloqueada para este usuário.");
      }

      return await this.repository.desbloquearConquista(
        validated.usuarioId,
        validated.conquistaId
      );
    } catch (error) {
      console.error("Erro no service ao desbloquear conquista:", error);
      throw new Error("Não foi possível desbloquear a conquista.");
    }
  }

  async atualizarDesbloqueio(
    usuarioId: number,
    conquistaId: number,
    data: Partial<ConquistaUsuario>
  ): Promise<ConquistaUsuario> {
    const schema = z.object({
      usuarioId: z.number().int().positive("UsuarioId inválido"),
      conquistaId: z.number().int().positive("ConquistaId inválido"),
    });

    schema.parse({ usuarioId, conquistaId });

    try {
      return await this.repository.atualizarDesbloqueio(
        usuarioId,
        conquistaId,
        data
      );
    } catch (error) {
      console.error("Erro no service ao atualizar conquista do usuário:", error);
      throw new Error("Não foi possível atualizar a conquista.");
    }
  }

  async verificarSeDesbloqueada(
    usuarioId: number,
    conquistaId: number
  ): Promise<boolean> {
    const schema = z.object({
      usuarioId: z.number().int().positive("UsuarioId inválido"),
      conquistaId: z.number().int().positive("ConquistaId inválido"),
    });

    const validated = schema.parse({ usuarioId, conquistaId });

    try {
      return await this.repository.verificarSeDesbloqueada(
        validated.usuarioId,
        validated.conquistaId
      );
    } catch (error) {
      console.error(
        "Erro no service ao verificar conquista do usuário:",
        error
      );
      throw new Error("Não foi possível verificar a conquista.");
    }
  }
}

export const usuarioConquistaService = new UsuarioConquistaService(
  usuarioConquistaRepository
);