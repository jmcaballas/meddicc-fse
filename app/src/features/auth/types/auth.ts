import { z } from "zod";

export const UserInfoSchema = z.object({
  id: z.number(),
  username: z.string(),
  is_superuser: z.boolean(),
});

export const UserSchema = z.object({
  user: UserInfoSchema,
  token: z.string(),
});

export type UserInfo = z.infer<typeof UserInfoSchema>;
export type User = z.infer<typeof UserSchema>;

export type LoginInputs = {
  username: string;
  password: string;
};
