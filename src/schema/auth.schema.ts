import { ZodType, z } from "zod";
import { SCHEMA_ERROR_MESSAGE } from "constants/variables";
import { IAuthInfo, TLoginRequest } from "models/data";
import { emailPattern, passwordPattern } from "./lib/regex";

/* fields */
export const emailField = z
  .string()
  .min(1, { message: `이메일${SCHEMA_ERROR_MESSAGE.VOID}` })
  .regex(emailPattern, { message: SCHEMA_ERROR_MESSAGE.EMAIL });

const passwordField = z
  .string()
  .min(1, { message: `비밀번호${SCHEMA_ERROR_MESSAGE.VOID}` })
  .min(6, {
    message: SCHEMA_ERROR_MESSAGE.PASSWORD
  })
  .max(24, {
    message: SCHEMA_ERROR_MESSAGE.PASSWORD
  })
  .regex(passwordPattern, {
    message: SCHEMA_ERROR_MESSAGE.PASSWORD
  });

const nicknameField = z
  .string()
  .min(1, { message: `닉네임${SCHEMA_ERROR_MESSAGE.VOID}` })
  .min(6, { message: SCHEMA_ERROR_MESSAGE.NICKNAME })
  .max(13, { message: SCHEMA_ERROR_MESSAGE.NICKNAME });

export const validateEmailReault = (email: string) =>
  emailField.safeParse(email);

/* schema */
export type TCreateUserSchema = z.infer<typeof createUserSchema>;
export type TLoginUserSchema = z.infer<typeof loginUserSchema>;

export const createUserSchema: ZodType<IAuthInfo> = z
  .object({
    email: emailField,
    password: passwordField,
    confirmPassword: passwordField,
    nickname: nicknameField
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "비밀번호가 일치하지 않습니다."
  });

export const loginUserSchema: ZodType<TLoginRequest> = z.object({
  email: emailField,
  password: passwordField
});
