import express from "express"
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






app.listen(port,()=> console.log("Servidor rodando...  (: "))



export default app