import { devtools } from "zustand/middleware";
import { create } from "zustand";

interface IHeaderState {
  isChangeHeaderHeight: boolean;
  setIsChangeHeaderHeight: (height: boolean) => void;
}

const headerState = create<IHeaderState>()(
  devtools((set) => ({
    isChangeHeaderHeight: false,
    setIsChangeHeaderHeight: (height: boolean) =>
      set(() => ({ isChangeHeaderHeight: height }))
  }))
);

export default headerState;
