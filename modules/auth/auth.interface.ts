export type ILoginUser = {
  id: string;
  password: string;
};

export type ILoginResponse = {
  accessToken: string;
  refreshToken?: string;
  needChangePassword: boolean;
};
export type IRefreshToken = {
  accessToken: string;
};
