import express, { Application } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from "dotenv";

// import routes
import { router as authRoutes } from './routes/auth'
import connectDB from './config/db';

dotenv.config()
// connect to DB
connectDB()

const app: Application = express()

// app middlewares
app.use(express.json())

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
    app.use(cors({ origin: process.env.CLIENT_URL }))
}


// middleware
app.use('/api', authRoutes)




const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`API is running on port ${port} - ${process.env.NODE_ENV}`)
})

