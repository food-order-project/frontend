import { defineStore } from "pinia";
import { authService } from "../services/auth.service";

type UserRole = "SUPER_ADMIN" | "ADMIN" | "MANAGER" | "USER" | "CUSTOMER";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  roleName: string;
  roles: string[];
}

interface AuthState {
  token: string | null;
  role: UserRole | null;
  user: User | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    token: null,
    role: null,
    user: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    userRole: (state) => state.role,
    userName: (state) => state.user?.name,
  },

  actions: {
    setToken(token: string) {
      this.token = token;
      localStorage.setItem("token", token);
    },

    setUser(user: User) {
      this.user = user;
      // Use roleName if available, otherwise fall back to role
      const roleToUse = user.roleName || user.role;
      if (roleToUse) {
        this.role = roleToUse.toUpperCase() as UserRole;
        localStorage.setItem("role", roleToUse.toUpperCase());
      }
      localStorage.setItem("user", JSON.stringify(user));
    },

    setAuth(token: string, role: string) {
      this.token = token;
      this.role = role.toUpperCase() as UserRole;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role.toUpperCase());
    },

    clearAuth() {
      this.token = null;
      this.role = null;
      this.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user");
    },

    async initializeAuth() {
      // First load data from localStorage
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role") as UserRole | null;
      const userStr = localStorage.getItem("user");

      // Set initial values from localStorage
      if (token) {
        this.token = token;
      }

      if (role) {
        this.role = role;
      }

      if (userStr) {
        this.user = JSON.parse(userStr);
      }

      // Then validate with server if we have a token
      if (this.token) {
        await this.checkMe();
      }

      console.log("Auth initialized:", {
        isAuthenticated: this.isAuthenticated,
        role: this.role,
      });
    },

    async checkMe() {
      if (this.token) {
        try {
          const response = await authService.me(this.token);

          this.setToken(response.access_token);
          this.setUser(response.user);

          console.log("Token validated successfully");
          return true;
        } catch (error: any) {
          console.error("Token validation failed:", error);

          if (
            error.message &&
            (error.message.includes("unauthorized") ||
              error.message.includes("invalid token") ||
              error.message.includes("expired"))
          ) {
            console.log("Clearing auth due to invalid token");
            this.clearAuth();
            return false;
          }
        }
      }
      return !!this.token;
    },
  },
});
