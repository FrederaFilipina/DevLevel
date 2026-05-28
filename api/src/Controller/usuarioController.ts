import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { prisma } from '../prisma/prisma';
import { getParam, handleError, removeUndefined } from './utils';
// import { UsuarioService } from '../Service/usuarioService';

// const usuarioService = new UsuarioService();

export class UsuarioController {
  async criar(req: Request, res: Response) {
    try {
      const { nome, email, senha, avatarUrl, bio } = req.body;

      if (!nome || !email || !senha) {
        return res.status(400).json({ erro: 'nome, email e senha são obrigatórios' });
      }

      // const usuario = await usuarioService.criar({ nome, email, senha, avatarUrl, bio });
      const senhaHash = await bcrypt.hash(senha, 10);
      const usuario = await prisma.usuario.create({
        data: { nome, email, senha: senhaHash, avatarUrl, bio },
        select: {
          id: true,
          nome: true,
          email: true,
          avatarUrl: true,
          bio: true,
          xp: true,
          nivel: true,
          pontuacaoTotal: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return res.status(201).json(usuario);
    } catch (erro) {
      return handleError(res, erro, 'Erro ao criar usuário');
    }
  }

  async obter(req: Request, res: Response) {
    try {
      const id = getParam(req, 'id');
      // const usuario = await usuarioService.obter(id);
      const usuario = await prisma.usuario.findUnique({
        where: { id },
        select: {
          id: true,
          nome: true,
          email: true,
          avatarUrl: true,
          bio: true,
          xp: true,
          nivel: true,
          pontuacaoTotal: true,
          createdAt: true,
          updatedAt: true,
          temasUsuario: { include: { tema: true } },
          trilhasUsuario: { include: { trilha: true } },
          conquistasUsuario: { include: { conquista: true } },
          habilidadesUsuario: { include: { habilidade: true } },
          insigniasUsuario: { include: { insignia: true } },
        },
      });

      if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });

      return res.json(usuario);
    } catch (erro) {
      return handleError(res, erro, 'Erro ao obter usuário');
    }
  }

  async listar(_req: Request, res: Response) {
    try {
      // const usuarios = await usuarioService.listar();
      const usuarios = await prisma.usuario.findMany({
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          nome: true,
          email: true,
          avatarUrl: true,
          bio: true,
          xp: true,
          nivel: true,
          pontuacaoTotal: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return res.json(usuarios);
    } catch (erro) {
      return handleError(res, erro, 'Erro ao listar usuários');
    }
  }

  async atualizar(req: Request, res: Response) {
    try {
      const id = getParam(req, 'id');
      const { nome, email, senha, avatarUrl, bio, xp, nivel, pontuacaoTotal } = req.body;
      // const usuario = await usuarioService.atualizar(id, { nome, email, senha, avatarUrl, bio, xp, nivel, pontuacaoTotal });
      const data: Record<string, unknown> = removeUndefined({ nome, email, avatarUrl, bio, xp, nivel, pontuacaoTotal });

      if (senha !== undefined) {
        data.senha = await bcrypt.hash(senha, 10);
      }

      const usuario = await prisma.usuario.update({
        where: { id },
        data,
        select: {
          id: true,
          nome: true,
          email: true,
          avatarUrl: true,
          bio: true,
          xp: true,
          nivel: true,
          pontuacaoTotal: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return res.json(usuario);
    } catch (erro) {
      return handleError(res, erro, 'Erro ao atualizar usuário');
    }
  }

  async deletar(req: Request, res: Response) {
    try {
      const id = getParam(req, 'id');
      // await usuarioService.deletar(id);
      await prisma.usuario.delete({ where: { id } });
      return res.status(204).send();
    } catch (erro) {
      return handleError(res, erro, 'Erro ao deletar usuário');
    }
  }
}

// export const usuarioController = new UsuarioController(usuarioService);
