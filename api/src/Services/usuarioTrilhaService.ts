import z from "zod";
import type { TrilhaUsuario } from "../prisma/generated/client";
import {
    usuarioTrilhaRepository,
    UsuarioTrilhaRepository,
} from "../repositories/usuarioTrilhaRepository";

export class UsuarioTrilhaService {
    constructor(private readonly repository: UsuarioTrilhaRepository) { }

    // =========================
    // LEITURA
    // =========================

    async listarTodos(): Promise<TrilhaUsuario[]> {
        try {
            return await this.repository.listarTodos();
        } catch (error) {
            console.error("Erro no service ao listar trilhas do usuário:", error);
            throw new Error("Não foi possível listar os registros de trilha do usuário.");
        }
    }

    async buscarPorId(id: number): Promise<TrilhaUsuario | null> {
        const schema = z.number().int().positive("ID inválido");
        const idValidated = schema.parse(id);

        try {
            return await this.repository.buscarPorId(idValidated);
        } catch (error) {
            console.error("Erro no service ao buscar trilha do usuário por ID:", error);
            throw new Error("Não foi possível buscar o registro.");
        }
    }

    async buscarPorUsuarioETrilha(
        usuarioId: number,
        trilhaId: number
    ): Promise<TrilhaUsuario | null> {
        const schema = z.object({
            usuarioId: z.number().int().positive("UsuarioId inválido"),
            trilhaId: z.number().int().positive("TrilhaId inválido"),
        });

        const validated = schema.parse({ usuarioId, trilhaId });

        try {
            return await this.repository.buscarPorUsuarioETrilha(
                validated.usuarioId,
                validated.trilhaId
            );
        } catch (error) {
            console.error("Erro no service ao buscar trilha-usuário composto:", error);
            throw new Error("Não foi possível buscar o registro.");
        }
    }

    // =========================
    // PROGRESSO (BÁSICO)
    // =========================

    async atualizarProgresso(
        usuarioId: number,
        trilhaId: number,
        data: Partial<TrilhaUsuario>
    ): Promise<TrilhaUsuario> {
        const schema = z.object({
            usuarioId: z.number().int().positive(),
            trilhaId: z.number().int().positive(),
        });

        schema.parse({ usuarioId, trilhaId });

        try {
            return await this.repository.atualizarProgresso(
                usuarioId,
                trilhaId,
                data
            );
        } catch (error) {
            console.error("Erro no service ao atualizar progresso:", error);
            throw new Error("Não foi possível atualizar o progresso da trilha.");
        }
    }

    async atualizarStatus(
        usuarioId: number,
        trilhaId: number,
        status: TrilhaUsuario["status"]
    ): Promise<TrilhaUsuario> {
        const schema = z.object({
            usuarioId: z.number().int().positive(),
            trilhaId: z.number().int().positive(),
            status: z.enum([
                "EM_ANDAMENTO",
                "CONCLUIDA",
                "AGUARDANDO_REVISAO",
                "BLOQUEADA",
            ]),
        });

        const validated = schema.parse({ usuarioId, trilhaId, status });

        try {
            return await this.repository.atualizarStatus(
                validated.usuarioId,
                validated.trilhaId,
                validated.status
            );
        } catch (error) {
            console.error("Erro no service ao atualizar status:", error);
            throw new Error("Não foi possível atualizar o status da trilha.");
        }
    }

    // =========================
    // PROGRESSO NUMÉRICO (CORRIGIDO)
    // =========================

    async atualizarProgressoNumerico(
        usuarioId: number,
        trilhaId: number,
        dados: {
            pontuacaoAtual?: number;
            percentualConclusao?: number;
            moduloAtualId?: number;
            questaoAtualId?: number;
            podeDesbloquear?: boolean;
            desbloqueadaPorTrilhaId?: number;
        }
    ): Promise<TrilhaUsuario> {
        const schema = z.object({
            usuarioId: z.number().int().positive(),
            trilhaId: z.number().int().positive(),
            dados: z.object({
                pontuacaoAtual: z.number().nonnegative().optional(),
                percentualConclusao: z.number().min(0).max(100).optional(),
                moduloAtualId: z.number().int().positive().optional(),
                questaoAtualId: z.number().int().positive().optional(),
                podeDesbloquear: z.boolean().optional(),
                desbloqueadaPorTrilhaId: z.number().int().positive().optional(),
            }),
        });

        const validated = schema.parse({ usuarioId, trilhaId, dados });

        // SOLUÇÃO: remove undefined (compatível com strict TS)
        type CleanDados = {
            pontuacaoAtual?: number;
            percentualConclusao?: number;
            moduloAtualId?: number;
            questaoAtualId?: number;
            podeDesbloquear?: boolean;
            desbloqueadaPorTrilhaId?: number;
        };

        const cleanData: CleanDados = {};

        if (validated.dados.pontuacaoAtual !== undefined)
            cleanData.pontuacaoAtual = validated.dados.pontuacaoAtual;

        if (validated.dados.percentualConclusao !== undefined)
            cleanData.percentualConclusao = validated.dados.percentualConclusao;

        if (validated.dados.moduloAtualId !== undefined)
            cleanData.moduloAtualId = validated.dados.moduloAtualId;

        if (validated.dados.questaoAtualId !== undefined)
            cleanData.questaoAtualId = validated.dados.questaoAtualId;

        if (validated.dados.podeDesbloquear !== undefined)
            cleanData.podeDesbloquear = validated.dados.podeDesbloquear;

        if (validated.dados.desbloqueadaPorTrilhaId !== undefined)
            cleanData.desbloqueadaPorTrilhaId = validated.dados.desbloqueadaPorTrilhaId;

        try {
            return await this.repository.atualizarProgressoNumerico(
                validated.usuarioId,
                validated.trilhaId,
                cleanData
            );
        } catch (error) {
            console.error("Erro no service ao atualizar progresso numérico:", error);
            throw new Error("Não foi possível atualizar o progresso da trilha.");
        }
    }

    // =========================
    // CONCLUSÃO
    // =========================

    async concluirTrilha(
        usuarioId: number,
        trilhaId: number
    ): Promise<TrilhaUsuario> {
        const schema = z.object({
            usuarioId: z.number().int().positive(),
            trilhaId: z.number().int().positive(),
        });

        const validated = schema.parse({ usuarioId, trilhaId });

        try {
            return await this.repository.concluirTrilha(
                validated.usuarioId,
                validated.trilhaId
            );
        } catch (error) {
            console.error("Erro no service ao concluir trilha:", error);
            throw new Error("Não foi possível concluir a trilha.");
        }
    }
}

export const usuarioTrilhaService = new UsuarioTrilhaService(
    usuarioTrilhaRepository
);