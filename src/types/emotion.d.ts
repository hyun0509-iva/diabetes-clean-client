import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    bgColor: {
      main: string;
      sub: string;
      primary: string;
      secondary: string;
      success: string;
      danger: string;
      conceled: string;
    };
    colors: {
      darkGray: string;
      lightGray: string;
    };
    boxShadow: {
      thick: string;
      middle: string;
      light: string;
    };
  }
}
