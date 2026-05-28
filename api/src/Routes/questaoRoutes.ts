import { Router } from 'express';
import { QuestaoController } from '../controllers/questaoController';

const router = Router();
const controller = new QuestaoController();

router.post('/', controller.criar);
router.get('/:id', controller.obter);
router.get('/modulo/:moduloId', controller.listarPorModulo);
router.put('/:id', controller.atualizar);
router.delete('/:id', controller.deletar);

export default router;
