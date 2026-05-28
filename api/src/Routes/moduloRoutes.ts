import { Router } from 'express';
import { ModuloController } from '../controllers/moduloController';

const router = Router();
const controller = new ModuloController();

router.post('/', controller.criar);
router.get('/:id', controller.obter);
router.get('/trilha/:trilhaId', controller.listarPorTrilha);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.deletar);

export default router;
