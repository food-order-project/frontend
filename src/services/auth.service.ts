import axios from 'axios'

const API_URL = 'http://localhost:3000'

interface LoginCredentials {
  email: string
  password: string
}

interface LoginResponse {
  access_token: string
  user: {
    id: string
    email: string
    name: string
    role: string
    roles: string[]
  }
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials)
      console.log('Login Response:', response.data) // Response'u kontrol edelim
      return response.data
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('E-posta veya şifre hatalı')
      }
      throw new Error('Giriş yapılırken bir hata oluştu')
    }
  }
} 