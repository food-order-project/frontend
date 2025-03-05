import axios from "axios";

const API_URL = "http://localhost:3000";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    roleName: string;
    roles: string[];
  };
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      console.log("Login Response:", response.data); // Response'u kontrol edelim
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error("E-posta veya şifre hatalı");
      }
      throw new Error("Giriş yapılırken bir hata oluştu");
    }
  },

  async me(token: string): Promise<LoginResponse> {
    try {
      const response = await axios.post(
        `${API_URL}/auth/me`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error("Error in me() method:", error);

      // Check for specific error types
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 401) {
          throw new Error("unauthorized: Token is invalid or expired");
        } else {
          throw new Error(`Server error: ${error.response.status}`);
        }
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error("Network error: No response from server");
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error(`Request error: ${error.message}`);
      }
    }
  },
};
