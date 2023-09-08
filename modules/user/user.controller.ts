import { RequestHandler } from 'express'
import { createUserService } from './user.service'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const userData = req.body
    const user = await createUserService(userData)

    res.status(200).json({
      status: true,
      message: 'user crate successfully!!',
      user: user,
    })
  } catch (error) {
    next(error)
  }
}

export default {
  createUser,
}
