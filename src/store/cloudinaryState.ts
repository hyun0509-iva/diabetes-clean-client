import { Cloudinary } from "@cloudinary/url-gen";
import { devtools } from "zustand/middleware";
import { create } from "zustand";

interface IcloudinaryState {
  cld: Cloudinary | null;
  setCid: (cld: Cloudinary) => void;
}

const cloudinaryState = create<IcloudinaryState>()(
  devtools((set) => ({
    cld: null,
    setCid: (cld: Cloudinary) =>
      set({
        cld
      })
  }))
);

export default cloudinaryState;
