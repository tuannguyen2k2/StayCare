export interface IProfile {
  full_name: string;
  email: string;
  phone: string;
  role: string;
  role_id: number;
  ic_code: string;
}

export type ProfileFormType = {
  full_name: string;
  email?: string;
  phone: string;
  ic_code: string;
};

export type ChangePasswordType = {
  old_password: string;
  new_password: string;
  confirmed_password: string;
};
