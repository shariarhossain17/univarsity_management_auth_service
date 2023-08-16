import config from '../../config/index'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateId } from './user.utils'

const createUser = async (userData: IUser): Promise<IUser | null> => {
  const id = await generateId()

  userData.id = id
  if (!userData.password) {
    userData.password = config.user_default_password as string
  }
  const user = await User.create(userData)
  if (!user) {
    throw new Error('Failed to create user')
  }
  return user
}

export default {
  createUser,
}
