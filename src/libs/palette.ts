export const palette = {
  gray: [
    "#f8f9fa",
    "#f1f3f5",
    "#ced4da",
    "#868e96",
    "#495057",
    "#212529",
    "#262527"
  ],
  indigo: [
    "#edf2ff",
    "#bac8ff",
    "#91a7ff",
    "#748ffc",
    "#4c6ef5",
    "#3b5bdb",
    "#364fc7"
  ],
  blue: [
    "#d0ebff",
    "#a5d8ff",
    "#74c0fc",
    "#4dabf7",
    "#228be6",
    "#1c7ed6",
    "#1864ab"
  ],
  orange: [
    "#fff4e6",
    "#ffe8cc",
    "#ffd8a8",
    "#ffa94d",
    "#ff922b",
    "#f76707",
    "#d9480f"
  ],
  yellow: [
    "#fff9db",
    "#fff3bf",
    "#ffec99",
    "#ffe066",
    "#ffd43b",
    "#fcc419",
    "#fab005"
  ],
  teal: [
    "#e6fcf5",
    "#96f2d7",
    "#63e6be",
    "#38d9a9",
    "#0ca678",
    "#099268",
    "#087f5b"
  ]
};
export const theme = {
  // 자주 사용할 배경
  bgColor: {
    main: "#70290d",
    sub: "#fff",
    primary: palette.blue[3],
    secondary: palette.gray[2],
    success: palette.teal[6],
    danger: palette.orange[6],
    conceled: "#4f2323"
  },
  // 자주 사용할 색상
  colors: {
    darkGray: palette.gray[5],
    lightGray: palette.gray[0]
  },
  // 자주 사용할 박스 그림자
  boxShadow: {
    thick: "0 4px 23px -5px rgb(0 0 0 / 25%)",
    middle: "0px 0px 12px -3px rgb(0 0 0 / 20%)",
    light: "0px 2px 13px -1px rgb(0 0 0 / 10%)"
  }
};
