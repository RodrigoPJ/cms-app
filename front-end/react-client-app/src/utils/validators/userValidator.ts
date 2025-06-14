import { ZodSchema, ZodError } from "zod";

export function validateResponse<T>(data: unknown, schema: ZodSchema<T>): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    console.error("Response validation error:", result.error);
    throw new ZodError(result.error.errors);
  }

  return result.data;
}

import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  userName: z.string(),
  user: z.string().email(),
  dateCreatedAt: z.string().datetime(),
	userType: z.string()
});

export type User = z.infer<typeof userSchema>;