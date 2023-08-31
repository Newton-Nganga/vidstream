import "dotenv/config"
import express from "express"
import router from "./Routes/Routes"
import bodyParser from "body-parser"
import cors from 'cors'
// import "dotenv/config"
require('dotenv').config()

const app = express()

const PORT = process.env.PORT || 3000

// app.use(express.json())
// app.use(express.urlencoded({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const whitelist =['*', 'http://localhost:5173','https://vidstream.vercel.app']

const corsOptions ={
    origins:whitelist,
    methods:['GET', 'POST', 'PATCH', 'DELETE'], 
}

app.use(cors(corsOptions))
app.use('/vidstream-clients-server',router)


app.listen(PORT,()=>console.log(`[server]:Server running at port :${PORT}`))