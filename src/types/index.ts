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

export interface Meal {
  id?: string;
  name: string;
  description: string;
  category: string;
  dietaryType: {
    vegetarian: boolean;
    vegan: boolean;
  };
  imageUrl?: string;
  preparationTime?: number;
  isActive: boolean;
  calories: number;
  allergens: string[];
  price?: number;
  stock?: number;
  sold?: number;
  createdAt?: Date;
  updatedAt?: Date;
} 