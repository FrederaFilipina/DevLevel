import { Router } from 'express';
import { HabilidadeController } from '../Controller/habilidadeController';

const router = Router();
const controller = new HabilidadeController();

router.post('/usuarios/vincular', controller.vincularUsuario);
router.get('/usuarios/:usuarioId', controller.habilidadesDoUsuario);
router.put('/usuarios/:id', controller.atualizarPontuacao);
router.delete('/usuarios/:id', controller.desvincularUsuario);
router.get('/', controller.listar);
router.get('/:id', controller.obter);

export default router;
