import express from 'express'
import authRoutes from './routes/authRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productroutes from './routes/productRoutes.js'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import cors from 'cors'

//config
dotenv.config()

//connect db
connectDB()

//rest object
const app = express()

//middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v1/auth', authRoutes)

app.use('/api/v1/category', categoryRoutes)

app.use('/api/v1/product', productroutes)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`server start at ${PORT}`)
})
