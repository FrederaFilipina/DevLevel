import type { Request, Response } from 'express';

export function removeUndefined<T extends Record<string, unknown>>(data: T) {
  return Object.fromEntries(
    Object.entries(data).filter(([, value]) => value !== undefined)
  ) as Partial<T>;
}

export function handleError(res: Response, erro: unknown, fallbackMessage: string) {
  const code = typeof erro === 'object' && erro !== null && 'code' in erro ? erro.code : undefined;

  if (code === 'P2025') {
    return res.status(404).json({ erro: 'Registro não encontrado' });
  }

  if (code === 'P2002') {
    return res.status(409).json({ erro: 'Registro duplicado' });
  }

  return res.status(500).json({ erro: fallbackMessage });
}

export function getParam(req: Request, key: string) {
  const value = req.params[key];
  return Array.isArray(value) ? value[0] ?? '' : value ?? '';
}
