export interface ISignUpForm {
  name: string;
  email: string;
  phone: string;
  icid: string;
  password: string;
  confirmPassword: string;
}

export interface ILoginForm {
  username: string;
  password: string;
}


export interface IForgotPasswordForm {
  email: string;
}

export interface INewPasswordForm {
  password: string;
  confirmPassword: string;
}

export interface ILoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  role: string;
  role_id: number;
}

export interface ISignUpResponse {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  role_id: number;
}

export interface IRefreshTokenResponse {
  access_token: string;
  token_type: string;
}

export interface IAuthCookies {
  accessToken?: string;
  refreshToken?: string;
}
