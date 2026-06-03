import z from "zod";
import type { TrilhaUsuario } from "../prisma/generated/client";

import {
    usuarioTrilhaService,
} from "../services/usuarioTrilhaService";

import {
    usuarioRespostaService,
} from "../services/usuarioRespostaService";

export class TrilhaProgressoService {
    constructor(
        private readonly trilhaService = usuarioTrilhaService,
        private readonly respostaService = usuarioRespostaService
    ) { }

    // =========================================
    // EXECUTAR RESPOSTA E AVANÇAR PROGRESSO
    // =========================================

    async processarResposta(data: {
        usuarioId: number;
        trilhaId: number;
        questaoId: number;
        respostaQuestaoId: number;
        correta: boolean;
        pontuacao: number;
        proximaQuestaoId?: number | null;
    }): Promise<{
        trilha: TrilhaUsuario;
        mensagem: string;
        proximaQuestaoId: number | null;
        concluida: boolean;
    }> {
        const schema = z.object({
            usuarioId: z.number().int().positive(),
            trilhaId: z.number().int().positive(),
            questaoId: z.number().int().positive(),
            respostaQuestaoId: z.number().int().positive(),
            correta: z.boolean(),
            pontuacao: z.number().nonnegative(),
            proximaQuestaoId: z.number().int().positive().nullable().optional(),
        });

        const validated = schema.parse(data);

        // 1. Buscar progresso atual
        const trilhaAtual = await this.trilhaService.buscarPorUsuarioETrilha(
            validated.usuarioId,
            validated.trilhaId
        );

        if (!trilhaAtual) {
            throw new Error("Trilha não encontrada para o usuário.");
        }

        if (trilhaAtual.status === "CONCLUIDA") {
            throw new Error("Trilha já foi concluída.");
        }

        // 2. Registrar resposta (histórico)
        await this.respostaService.registrarResposta({
            usuarioId: validated.usuarioId,
            questaoId: validated.questaoId,
            respostaQuestaoId: validated.respostaQuestaoId,
            pontuacaoRecebida: validated.pontuacao,
        });

        // 3. Atualizar progresso da trilha
        const novaPontuacao =
            (trilhaAtual.pontuacaoAtual ?? 0) + validated.pontuacao;

        const percentual =
            trilhaAtual.percentualConclusao >= 100
                ? 100
                : (trilhaAtual.percentualConclusao ?? 0) + 10; // simplificado (você pode refinar depois)

        // 4. Verificar finalização
        const acabouTrilha = validated.proximaQuestaoId == null;

        const updateData: {
            pontuacaoAtual?: number;
            percentualConclusao?: number;
            questaoAtualId?: number;
            podeDesbloquear?: boolean;
        } = {
            pontuacaoAtual: novaPontuacao,
            percentualConclusao: percentual,
            podeDesbloquear: acabouTrilha ? novaPontuacao >= 0 : false,
        };

        if (validated.proximaQuestaoId != null) {
            updateData.questaoAtualId = validated.proximaQuestaoId;
        }

        const trilhaAtualizada =
            await this.trilhaService.atualizarProgressoNumerico(
                validated.usuarioId,
                validated.trilhaId,
                updateData
            );

        // 5. Finalizar trilha se necessário
        if (acabouTrilha) {
            await this.trilhaService.concluirTrilha(
                validated.usuarioId,
                validated.trilhaId
            );
        }

        // 6. Resposta do fluxo
        return {
            trilha: trilhaAtualizada,
            mensagem: validated.correta
                ? "Resposta correta!"
                : "Resposta registrada.",
            proximaQuestaoId: validated.proximaQuestaoId ?? null,
            concluida: acabouTrilha,
        };
    }
}

export const trilhaProgressoService = new TrilhaProgressoService();