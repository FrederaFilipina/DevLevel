import type { Request, Response } from 'express';
import { prisma } from '../prisma/prisma';
import { getParam, handleError } from './utils';
// import { ConquistaService } from '../Service/conquistaService';

// const conquistaService = new ConquistaService();

export class ConquistaController {
  async obter(req: Request, res: Response) {
    try {
      const id = getParam(req, 'id');
      // const conquista = await conquistaService.obter(id);
      const conquista = await prisma.conquista.findUnique({ where: { id } });
      if (!conquista) return res.status(404).json({ erro: 'Conquista não encontrada' });
      return res.json(conquista);
    } catch (erro) {
      return handleError(res, erro, 'Erro ao obter conquista');
    }
  }

  async listar(_req: Request, res: Response) {
    try {
      // const conquistas = await conquistaService.listar();
      const conquistas = await prisma.conquista.findMany({ orderBy: { createdAt: 'asc' } });
      return res.json(conquistas);
    } catch (erro) {
      return handleError(res, erro, 'Erro ao listar conquistas');
    }
  }

  async desbloquearConquista(req: Request, res: Response) {
    try {
      const { usuarioId, conquistaId } = req.body;
      if (!usuarioId || !conquistaId) {
        return res.status(400).json({ erro: 'usuarioId e conquistaId são obrigatórios' });
      }

      // const desbloqueio = await conquistaService.desbloquearConquista({ usuarioId, conquistaId });
      const desbloqueio = await prisma.$transaction(async (tx) => {
        const conquista = await tx.conquista.findUnique({ where: { id: conquistaId } });
        if (!conquista) throw new Error('CONQUISTA_NAO_ENCONTRADA');

        const criada = await tx.conquistaUsuario.create({
          data: { usuarioId, conquistaId },
          include: { conquista: true },
        });

        await tx.usuario.update({
          where: { id: usuarioId },
          data: { xp: { increment: conquista.xpRecompensa } },
        });

        return criada;
      });

      return res.status(201).json(desbloqueio);
    } catch (erro) {
      if (erro instanceof Error && erro.message === 'CONQUISTA_NAO_ENCONTRADA') {
        return res.status(404).json({ erro: 'Conquista não encontrada' });
      }

      return handleError(res, erro, 'Erro ao desbloquear conquista');
    }
  }

  async conquistasDoUsuario(req: Request, res: Response) {
    try {
      const usuarioId = getParam(req, 'usuarioId');
      // const conquistas = await conquistaService.conquistasDoUsuario(usuarioId);
      const conquistas = await prisma.conquistaUsuario.findMany({
        where: { usuarioId },
        include: { conquista: true },
        orderBy: { desbloqueadaEm: 'desc' },
      });

      return res.json(conquistas);
    } catch (erro) {
      return handleError(res, erro, 'Erro ao listar conquistas do usuário');
    }
  }

  async deletarDesbloqueio(req: Request, res: Response) {
    try {
      const id = getParam(req, 'id');
      // await conquistaService.deletarDesbloqueio(id);
      await prisma.conquistaUsuario.delete({ where: { id } });
      return res.status(204).send();
    } catch (erro) {
      return handleError(res, erro, 'Erro ao deletar desbloqueio de conquista');
    }
  }
}

// export const conquistaController = new ConquistaController(conquistaService);
