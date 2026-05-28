import { Router } from 'express';
import { InsigniaController } from '../controllers/insigniaController';

const router = Router();
const controller = new InsigniaController();

router.post('/', controller.criar);
router.get('/:id', controller.obter);
router.get('/', controller.listar);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.deletar);

// InsigniaUsuario routes
router.post('/usuarios/desbloquear', controller.desbloquearInsignia);
router.get('/usuarios/:usuarioId', controller.insigniasDoUsuario);
router.delete('/usuarios/:id', controller.deletarDesbloqueio);

export default router;
