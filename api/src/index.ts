import express from "express"
import temaRoutes from './routes/temaRoutes';
import trilhaRoutes from './routes/trilhaRoutes';
import moduloRoutes from './routes/moduloRoutes';
import questaoRoutes from './routes/questaoRoutes';
import respostaRoutes from './routes/questaoRespostaRoutes';
import conquistaRoutes from './routes/conquistaRoutes';
import habilidadeRoutes from './routes/habilidadeRoutes';
import cors from "cors"
import { authRoutes } from "./routes/AuthRoutes"
import { auth } from "./middleware/auth"
import { userRoutes } from "./routes/UserRoutes"


const port = 3000
const app = express()

app.use(express.json())

app.use(cors())

app.use(authRoutes)

app.use(auth)

app.use('/user',userRoutes)



app.use('/api/temas', temaRoutes);
app.use('/api/trilhas', trilhaRoutes);
app.use('/api/modulos', moduloRoutes);
app.use('/api/questoes', questaoRoutes);
app.use('/api/respostas', respostaRoutes);
app.use('/api/conquistas', conquistaRoutes);
app.use('/api/habilidades', habilidadeRoutes);



app.listen(port,()=> console.log("Servidor rodando...  (: "))


export default app
