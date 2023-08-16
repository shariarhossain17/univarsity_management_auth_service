import colors from 'colors'
import app from './app/app'
import config from './config/index'
import connectDB from './db/db'

connectDB()

app.listen(config.port, () => {
  console.log(
    colors.yellow(`university-management server running on ${config.port}`),
  )
})
