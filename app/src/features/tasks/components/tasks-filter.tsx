import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { useForm, SubmitHandler } from "react-hook-form";
import { TaskSearch } from "../types/tasks";

export const TasksFilter = () => {
  const navigate = useNavigate();
  const route = getRouteApi("/");
  const { task_name } = route.useSearch();

  const showClearFilters = () => {
    if (!task_name) {
      return false;
    }

    return true;
  };

  const handleClearFilters = () => {
    reset();
    navigate({
      to: "/",
    });
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskSearch>({
    defaultValues: {
      task_name: task_name,
    },
  });
  const onSubmit: SubmitHandler<TaskSearch> = async (data) => {
    const checkbox = document.querySelector(
      'input[type="checkbox"]'
    ) as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = false;
    }

    navigate({
      to: ".",
      search: () => ({
        task_name: data.task_name,
      }),
    });
  };

  return (
    <div className="container mx-auto flex flex-col items-center">
      <div className="collapse bg-base-200">
        <label htmlFor="filterCheckbox" className="sr-only">
          Filters
        </label>
        <input id="filterCheckbox" type="checkbox" />
        <div className="collapse-title font-medium">Filters</div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="collapse-content flex flex-col justify-center gap-2"
        >
          <label className="input input-bordered flex items-center gap-2">
            Task Name
            <input
              {...register("task_name")}
              type="text"
              placeholder="Enter task name"
              className="grow"
            />
          </label>
          {errors.task_name && (
            <p className="text-error">{errors.task_name.message}</p>
          )}
          <input type="submit" className="btn btn-outline btn-primary" />
        </form>
      </div>
      {showClearFilters() && (
        <button
          className="btn btn-outline btn-accent btn-sm my-2"
          onClick={() => handleClearFilters()}
          title="Clear Filters"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
};
