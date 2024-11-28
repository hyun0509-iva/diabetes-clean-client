import { devtools } from "zustand/middleware";
import { create } from "zustand";

export interface INavLinkState {
  targetLinkIdx: number;
  setTargetLinkIdx: (txt: number) => void;
}

const navLinkState = create<INavLinkState>()(
  devtools((set) => ({
    targetLinkIdx: 0,
    setTargetLinkIdx: (idx: number) =>
      set(() => ({
        targetLinkIdx: idx
      }))
  }))
);

export default navLinkState;
