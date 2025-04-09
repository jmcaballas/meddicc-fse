import { TaskSearchSchema } from "@/features/tasks/types/tasks";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  validateSearch: TaskSearchSchema,
});
