import cors from 'cors'
import express, { Application } from 'express'
import globalErrorHandler from '../middleware/globalErrorHandler'
import router from '../modules/user/user.route'
const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/users', router)

// global error

// app.get('/', (_: Request, _: Response, _: NextFunction) => {})

app.use(globalErrorHandler)
export default app
