import { Router } from 'express';
import { ModuloController } from '../Controller/moduloController';

const router = Router();
const controller = new ModuloController();

router.get('/trilha/:trilhaId', controller.listarPorTrilha);
router.get('/:id', controller.obter);

export default router;
