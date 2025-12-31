export interface LoginFormData {
  email: string
  password: string
}

export interface LoginResponse {
  message: string
  user: {
    email: string
  }
  token: string
}

export interface ProfileResponse {
  user: {
    email: string;
  };
}
