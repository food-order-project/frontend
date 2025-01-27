// Burada genel tip tanımlamalarını yapacağız
export interface User {
  id: number
  username: string
  email: string
}

export interface ApiResponse<T> {
  data: T
  message: string
  status: number
} 