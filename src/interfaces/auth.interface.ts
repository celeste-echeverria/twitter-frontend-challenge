export interface SignUpData {
  name: string;
  password: string;
  email: string;
  username: string;
  confirmPassword?: string
}

export interface SignInData {
  email: string;
  password: string;
}

