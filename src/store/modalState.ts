import { devtools } from "zustand/middleware";
import { create } from "zustand";

export interface IModal {
  type: string | null;
  isOpen: boolean;
  props?: string | JSX.Element;
}

export interface IModalState {
  modal: IModal | null;
  openModal: ({ type, isOpen, props }: IModal) => void;
  closeModal: () => void;
}

export const modalState = create<IModalState>()(
  devtools((set) => ({
    modal: null,
    openModal: ({ type, isOpen, props }: IModal) =>
      set(() => ({ modal: { type, isOpen, props } })),
    closeModal: () => set(() => ({ modal: null }))
  }))
);

export default modalState;
