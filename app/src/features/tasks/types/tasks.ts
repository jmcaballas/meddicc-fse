import { z } from "zod";

export const TaskSchema = z.object({
  id: z.number(),
  user: z.number(),
  name: z.string(),
  description: z.string(),
  is_completed: z.boolean(),
  due_date: z.string().datetime(),
  completed_date: z.string().datetime().nullable(),
});

export const TaskInputSchema = z.object({
  name: z.string(),
  description: z.string(),
  due_date: z.string(),
});

export const TaskSearchSchema = z
  .object({
    page: z.number(),
    task_name: z.string().catch(""),
  })
  .partial();

export type Task = z.infer<typeof TaskSchema>;
export type TaskInput = z.infer<typeof TaskInputSchema>;
export type TaskSearch = z.infer<typeof TaskSearchSchema>;
