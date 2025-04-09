import { User, UserInfo } from "@/features/auth/types/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  user: UserInfo | null;
  login: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      user: null,
      login: (user: User) => {
        localStorage.setItem("accessToken", user.token);
        set({ user: user.user });
      },
      logout: () => {
        set({ user: null });
        localStorage.clear();
      },
    }),
    {
      name: "userLoginStatus",
    },
  ),
);
