import type { Request, Response } from 'express';
import { prisma } from '../prisma/prisma';
import { getParam, handleError } from './utils';
// import { InsigniaService } from '../Service/insigniaService';

// const insigniaService = new InsigniaService();

export class InsigniaController {
  async obter(req: Request, res: Response) {
    try {
      const id = getParam(req, 'id');
      // const insignia = await insigniaService.obter(id);
      const insignia = await prisma.insignia.findUnique({ where: { id } });
      if (!insignia) return res.status(404).json({ erro: 'Insígnia não encontrada' });
      return res.json(insignia);
    } catch (erro) {
      return handleError(res, erro, 'Erro ao obter insígnia');
    }
  }

  async listar(_req: Request, res: Response) {
    try {
      // const insignias = await insigniaService.listar();
      const insignias = await prisma.insignia.findMany({ orderBy: { createdAt: 'asc' } });
      return res.json(insignias);
    } catch (erro) {
      return handleError(res, erro, 'Erro ao listar insígnias');
    }
  }

  async desbloquearInsignia(req: Request, res: Response) {
    try {
      const { usuarioId, insigniaId, temaId, trilhaId } = req.body;
      if (!usuarioId || !insigniaId) {
        return res.status(400).json({ erro: 'usuarioId e insigniaId são obrigatórios' });
      }

      // const desbloqueio = await insigniaService.desbloquearInsignia({ usuarioId, insigniaId, temaId, trilhaId });
      const desbloqueio = await prisma.$transaction(async (tx) => {
        const insignia = await tx.insignia.findUnique({ where: { id: insigniaId } });
        if (!insignia) throw new Error('INSIGNIA_NAO_ENCONTRADA');

        const criada = await tx.insigniaUsuario.create({
          data: { usuarioId, insigniaId, temaId, trilhaId },
          include: { insignia: true, tema: true, trilha: true },
        });

        await tx.usuario.update({
          where: { id: usuarioId },
          data: { xp: { increment: insignia.xpRecompensa } },
        });

        return criada;
      });

      return res.status(201).json(desbloqueio);
    } catch (erro) {
      if (erro instanceof Error && erro.message === 'INSIGNIA_NAO_ENCONTRADA') {
        return res.status(404).json({ erro: 'Insígnia não encontrada' });
      }

      return handleError(res, erro, 'Erro ao desbloquear insígnia');
    }
  }

  async insigniasDoUsuario(req: Request, res: Response) {
    try {
      const usuarioId = getParam(req, 'usuarioId');
      // const insignias = await insigniaService.insigniasDoUsuario(usuarioId);
      const insignias = await prisma.insigniaUsuario.findMany({
        where: { usuarioId },
        include: { insignia: true, tema: true, trilha: true },
        orderBy: { desbloqueadaEm: 'desc' },
      });

      return res.json(insignias);
    } catch (erro) {
      return handleError(res, erro, 'Erro ao listar insígnias do usuário');
    }
  }

  async deletarDesbloqueio(req: Request, res: Response) {
    try {
      const id = getParam(req, 'id');
      // await insigniaService.deletarDesbloqueio(id);
      await prisma.insigniaUsuario.delete({ where: { id } });
      return res.status(204).send();
    } catch (erro) {
      return handleError(res, erro, 'Erro ao deletar desbloqueio de insígnia');
    }
  }
}

// export const insigniaController = new InsigniaController(insigniaService);
