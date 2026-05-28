import { Router } from 'express';
import { QuestaoController } from '../Controller/questaoController';

const router = Router();
const controller = new QuestaoController();

router.get('/modulo/:moduloId', controller.listarPorModulo);
router.get('/:id', controller.obter);

export default router;
