export interface SignUpData {
  name: string;
  password: string;
  email: string;
  username: string;
  confirmPassword: string
}

export interface SignInData {
  username?: string;
  email?: string;
  password: string;
}

