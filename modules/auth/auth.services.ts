import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';

const loginUser = async (payload: ILoginUser): Promise<ILoginUser | null> => {
  const { id } = payload;

  const result = await User.findOne({ id });

  return result;
};

export default {
  loginUser,
};
