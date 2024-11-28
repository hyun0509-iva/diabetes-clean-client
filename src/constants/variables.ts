export const MAX_FILES_COUNT = 9;
export const SCHEMA_ERROR_MESSAGE = {
  VOID: "은 필수로 입력해야합니다.",
  EMAIL: "이메일 형식이 아닙니다.",
  PASSWORD:
    "비밀번호는 6~24자의 영문 대/소문자, 숫자, 특수문자(!@#$%^&만 포함)를 사용해 주세요.",
  NICKNAME: "닉네임은 3~13자리입니다."
};

Object.freeze(SCHEMA_ERROR_MESSAGE);
