import express from "express"
import usuarioRoutes from './Routes/usuarioRouter';
import temaRoutes from './Routes/temaRoutes';
import trilhaRoutes from './Routes/trilhaRoutes';
import moduloRoutes from './Routes/moduloRoutes';
import questaoRoutes from './Routes/questaoRoutes';
import respostaRoutes from './Routes/respostaRoutes';
import conquistaRoutes from './Routes/conquistaRoutes';
import habilidadeRoutes from './Routes/habilidadeRoutes';
import insigniaRoutes from './Routes/insigniaRoutes';
import rankingRoutes from './Routes/rankingRoutes';



const port = 3000
const app = express()

app.use(express.json())


app.use('/api/usuarios', usuarioRoutes);
app.use('/api/temas', temaRoutes);
app.use('/api/trilhas', trilhaRoutes);
app.use('/api/modulos', moduloRoutes);
app.use('/api/questoes', questaoRoutes);
app.use('/api/respostas', respostaRoutes);
app.use('/api/conquistas', conquistaRoutes);
app.use('/api/habilidades', habilidadeRoutes);
app.use('/api/insignias', insigniaRoutes);
app.use('/api/ranking', rankingRoutes);


app.listen(port,()=> console.log("Servidor rodando...  (: "))


export default app
