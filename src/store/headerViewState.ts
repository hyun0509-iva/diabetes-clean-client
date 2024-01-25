import { devtools } from "zustand/middleware";
import { create } from "zustand";

interface IHeaderViewState {
  isViewHeader: boolean;
  setIsViewHeader: (isView: boolean) => void;
}

const headerViewState = create<IHeaderViewState>()(
  devtools((set) => ({
    isViewHeader: false,
    setIsViewHeader: (isView: boolean) => set(() => ({ isViewHeader: isView }))
  }))
);

export default headerViewState;
