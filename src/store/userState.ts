import { IUserInfo } from "models/data";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IUserState {
  userInfo: IUserInfo | null;
  isAuth: string | null;
  setUserInfo: (userData: IUserInfo) => void;
  setIsAuth: (token: string | null) => void;
  logOut: () => void;
}

const userState = create<IUserState>()(
  devtools(
    persist(
      (set) => ({
        isAuth: null, // 인증 상태: 토큰 유무로 판단
        userInfo: null,
        setUserInfo: (userData: IUserInfo) =>
          set(() => ({
            userInfo: userData
          })),
        setIsAuth: (token: string | null) =>
          set((state) => ({
            isAuth: token
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
