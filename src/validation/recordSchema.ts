import { z } from "zod";

export const recordSchema = z.object({
  reference: z.string(),
  accountNumber: z.string(),
  startBalance: z.number(),
  mutation: z.number(),
  endBalance: z.number(),
  description: z.string(),
});
