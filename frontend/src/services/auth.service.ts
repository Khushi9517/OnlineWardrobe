import api from "../lib/axios";

import {
  AuthResponse,
  LoginInput,
  RegisterInput,
} from "../types/auth.types";

export const registerUser = async (
  data: RegisterInput
): Promise<AuthResponse> => {
  const response = await api.post(
    "/api/auth/register",
    data
  );

  return response.data;
};

export const loginUser = async (
  data: LoginInput
): Promise<AuthResponse> => {
  const response = await api.post(
    "/api/auth/login",
    data
  );

  return response.data;
};