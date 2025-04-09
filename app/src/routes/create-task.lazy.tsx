import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import { usePostTask } from "@/features/tasks/api/post-task";
import { TaskInput } from "@/features/tasks/types/tasks";
import { useAuthStore } from "@/lib/auth";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm, SubmitHandler } from "react-hook-form";

const CreateTask = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const postTaskMutation = usePostTask();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<TaskInput>();

  register("due_date", {
    required: "This field is required",
  });

  const dueDate = watch("due_date");

  const onSubmit: SubmitHandler<TaskInput> = async (data) => {
    const isValid = await trigger("due_date");
    if (!isValid) return;

    const updatedData = { ...data, user: user?.id };
    postTaskMutation.mutate(updatedData);
    navigate({ to: "/" });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="container mx-auto mt-4 flex flex-col justify-center gap-4 px-4"
    >
      <label className="input input-bordered flex items-center gap-2">
        Name
        <input
          {...register("name", { required: "This field is required" })}
          type="text"
          className="grow"
        />
      </label>
      {errors.name && <p className="text-error">{errors.name.message}</p>}

      <label className="input input-bordered flex items-center gap-2">
        Description
        <input
          {...register("description", { required: "This field is required" })}
          type="text"
          className="grow"
        />
      </label>
      {errors.description && (
        <p className="text-error">{errors.description.message}</p>
      )}

      <div>
        <button
          type="button"
          popoverTarget="due-date-popover"
          className="input input-bordered w-full text-left"
          style={{ anchorName: "--due-date" } as React.CSSProperties}
        >
          {dueDate ? new Date(dueDate).toLocaleDateString() : "Due date"}
        </button>
        <div
          popover="auto"
          id="due-date-popover"
          className="dropdown bg-base-100 p-4 rounded shadow"
          style={{ positionAnchor: "--due-date" } as React.CSSProperties}
        >
          <DayPicker
            mode="single"
            selected={dueDate ? new Date(dueDate) : undefined}
            onSelect={(date) => {
              if (date) {
                setValue("due_date", date.toISOString());
              }
            }}
          />
        </div>
        {errors.due_date && (
          <p className="text-error">{errors.due_date.message}</p>
        )}
      </div>

      <input
        type="submit"
        className="btn btn-outline btn-primary self-start mt-2"
      />
    </form>
  );
};

export const Route = createLazyFileRoute("/create-task")({
  component: CreateTask,
});
