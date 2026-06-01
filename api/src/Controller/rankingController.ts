import type { Request, Response } from 'express';
import { prisma } from '../prisma/prisma';
import { getParam, handleError } from './utils';
// import { RankingService } from '../Service/rankingService';

// const rankingService = new RankingService();

export class RankingController {
  async obterRanking(_req: Request, res: Response) {
    try {
      // const ranking = await rankingService.obterRanking();
      const usuarios = await prisma.usuario.findMany({
        orderBy: [{ xp: 'desc' }, { pontuacaoTotal: 'desc' }, { createdAt: 'asc' }],
        select: {
          id: true,
          nome: true,
          avatarUrl: true,
          xp: true,
          nivel: true,
          pontuacaoTotal: true,
        },
      });

      const ranking = usuarios.map((usuario, index) => ({
        posicao: index + 1,
        usuario,
      }));

      return res.json(ranking);
    } catch (erro) {
      return handleError(res, erro, 'Erro ao obter ranking');
    }
  }

  async obterPosicaoUsuario(req: Request, res: Response) {
    try {
      const usuarioId = getParam(req, 'usuarioId');
      // const posicao = await rankingService.obterPosicaoUsuario(usuarioId);
      const usuarios = await prisma.usuario.findMany({
        orderBy: [{ xp: 'desc' }, { pontuacaoTotal: 'desc' }, { createdAt: 'asc' }],
        select: { id: true, nome: true, avatarUrl: true, xp: true, nivel: true, pontuacaoTotal: true },
      });

      const index = usuarios.findIndex((usuario) => usuario.id === usuarioId);
      if (index === -1) return res.status(404).json({ erro: 'Usuário não encontrado no ranking' });

      return res.json({ posicao: index + 1, usuario: usuarios[index] });
    } catch (erro) {
      return handleError(res, erro, 'Erro ao obter posição do usuário');
    }
  }

  async atualizar(req: Request, res: Response) {
    try {
      const usuarioId = getParam(req, 'usuarioId');
      const { xpTotal, posicao } = req.body;
      if (xpTotal === undefined || posicao === undefined) {
        return res.status(400).json({ erro: 'xpTotal e posicao são obrigatórios' });
      }

      // const ranking = await rankingService.atualizar(usuarioId, { xpTotal, posicao });
      const ranking = await prisma.ranking.create({
        data: { usuarioId, xpTotal, posicao },
        include: { usuario: true },
      });

      return res.status(201).json(ranking);
    } catch (erro) {
      return handleError(res, erro, 'Erro ao atualizar ranking');
    }
  }
}


// export const rankingController = new RankingController(rankingService);
