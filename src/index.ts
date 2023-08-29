import "dotenv/config"
import express from "express"
import router from "./Routes"
const app = express()
const PORT = 8000

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/vidstream-clients-server',router)
app.listen(PORT,()=>console.log(`[server]:Server running at port :${PORT}`))