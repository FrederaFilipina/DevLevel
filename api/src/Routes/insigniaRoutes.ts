import { Router } from 'express';
import { InsigniaController } from '../Controller/insigniaController';

const router = Router();
const controller = new InsigniaController();

router.post('/usuarios/desbloquear', controller.desbloquearInsignia);
router.get('/usuarios/:usuarioId', controller.insigniasDoUsuario);
router.delete('/usuarios/:id', controller.deletarDesbloqueio);
router.get('/', controller.listar);
router.get('/:id', controller.obter);

export default router;
