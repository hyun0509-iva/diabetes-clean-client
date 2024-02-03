import { IUserInfo } from "models/data";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IUserState {
  userInfo: Partial<IUserInfo> | null;
  isAuth: boolean | null;
  setUserInfo: (userData: Partial<IUserInfo>) => void;
  setIsAuth: (isAuth: boolean | null) => void;
  logOut: () => void;
}

const userState = create<IUserState>()(
  devtools(
    persist(
      (set) => ({
        isAuth: null, // 인증 상태: 토큰 유무로 판단
        userInfo: null,
        setUserInfo: (userData) =>
          set((state) => ({
            userInfo: { ...state.userInfo, ...userData }
          })),
        setIsAuth: (isAuth: boolean | null) =>
          set(() => ({
            isAuth
          })),
        logOut: () => {
          set(() => ({
            isAuth: null,
            userInfo: null
          }));
        }
      }),
      { name: "userState" }
    )
  )
);

export default userState;
