import { IUserInfo } from "models/data";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IUserState {
  userInfo: Partial<IUserInfo> | null;
  isAuth: boolean | null;
  setUserInfo: (userData: Partial<IUserInfo>) => void;
  removeUserInfo: () => void;
  setIsAuth: (isAuth: boolean) => void;
}

const userState = create<IUserState>()(
  devtools(
    persist(
      (set) => ({
        userInfo: null,
        isAuth: null,
        setUserInfo: (userData) =>
          set((state) => ({
            userInfo: { ...state.userInfo, ...userData }
          })),
        removeUserInfo: () => {
          set(() => ({
            userInfo: null
          }));
        },
        setIsAuth: (isAuth: boolean) => {
          set(() => ({
            isAuth
          }));
        }
      }),
      { name: "userState" }
    )
  )
);

export default userState;
