import { Router } from 'express';
import { RankingController } from '../Controller/rankingController';

const router = Router();
const controller = new RankingController();

router.get('/', controller.obterRanking);
router.get('/usuario/:usuarioId', controller.obterPosicaoUsuario);
router.put('/usuario/:usuarioId', controller.atualizar);

export default router;
