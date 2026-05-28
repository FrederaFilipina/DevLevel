import { Request, Response } from 'express';

export class UsuarioController {
  async criar(req: Request, res: Response) {
    try {
      const { nome, email, senha } = req.body;
      // Implementar lógica com UsuarioService
      res.status(201).json({ message: 'Usuário criado com sucesso' });
    } catch (erro) {
      res.status(500).json({ erro: 'Erro ao criar usuário' });
    }
  }

  async obter(req: Request, res: Response) {
    try {
      const { id } = req.params;
      // Implementar lógica com UsuarioService
      res.json({ message: `Obtendo usuário ${id}` });
    } catch (erro) {
      res.status(500).json({ erro: 'Erro ao obter usuário' });
    }
  }

  async listar(req: Request, res: Response) {
    try {
      // Implementar lógica com UsuarioService
      res.json({ message: 'Listando usuários' });
    } catch (erro) {
      res.status(500).json({ erro: 'Erro ao listar usuários' });
    }
  }

  async atualizar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome, avatarUrl, bio } = req.body;
      // Implementar lógica com UsuarioService
      res.json({ message: `Usuário ${id} atualizado` });
    } catch (erro) {
      res.status(500).json({ erro: 'Erro ao atualizar usuário' });
    }
  }

  async deletar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      // Implementar lógica com UsuarioService
      res.status(204).send();
    } catch (erro) {
      res.status(500).json({ erro: 'Erro ao deletar usuário' });
    }
  }
}
