import { Router } from 'express';
import { TemaController } from '../Controller/temaController';

const router = Router();
const controller = new TemaController();

router.post('/usuarios/vincular', controller.vincularUsuario);
router.get('/usuarios/:usuarioId', controller.temasDoUsuario);
router.delete('/usuarios/:id', controller.desvincularUsuario);
router.get('/', controller.listar);
router.get('/:id', controller.obter);

export default router;
