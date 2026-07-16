export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: AuthUser;
}