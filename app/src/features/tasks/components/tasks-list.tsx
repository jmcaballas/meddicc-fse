import { useState } from "react";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";
import { SquareCheckBig, Trash } from "lucide-react";

import { useAuthStore } from "@/lib/auth";
import { useGetTasks } from "../api/get-tasks";
import { Task } from "../types/tasks";
import { TasksFilter } from "./tasks-filter";
import { useDeleteTask } from "../api/delete-task";
import { useCompleteTask } from "../api/complete-task";

export const TasksList = () => {
  const route = getRouteApi("/");
  const { page, task_name } = route.useSearch();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const tasksQuery = useGetTasks();
  const deleteTaskMutation = useDeleteTask();
  const completeTaskMutation = useCompleteTask();

  const [currentPage, setCurrentPage] = useState(page || 1);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  const handleCreateTask = () => {
    navigate({ to: "/create-task" });
  };

  const handlePreviousPage = () => {
    const updatedPage = currentPage - 1;
    setCurrentPage(updatedPage);

    navigate({
      to: ".",
      search: () => ({
        page: updatedPage,
        task_name: task_name,
      }),
    });
  };

  const handleNextPage = () => {
    const updatedPage = currentPage + 1;
    setCurrentPage(updatedPage);

    navigate({
      to: ".",
      search: () => ({
        page: updatedPage,
        task_name: task_name,
      }),
    });
  };

  const handleShowModal = (id: number) => {
    setSelectedTaskId(id);
    const deleteModal = document.getElementById(
      "delete_modal"
    ) as HTMLDialogElement;
    if (deleteModal) {
      deleteModal.showModal();
    }
  };

  const handleCloseModal = () => {
    const deleteModal = document.getElementById(
      "delete_modal"
    ) as HTMLDialogElement;
    if (deleteModal) {
      deleteModal.close();
    }
  };

  const handleDelete = () => {
    if (selectedTaskId !== null) {
      deleteTaskMutation.mutate(selectedTaskId);
      handleCloseModal();
    }
  };

  if (tasksQuery.isLoading) {
    return (
      <div className="flex justify-center">
        <div className="loading loading-spinner loading-md"></div>
      </div>
    );
  }

  if (!tasksQuery.data) return null;

  const renderRow = (item: Task) => {
    return (
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.description}</td>
        <td>{format(item.due_date, "d MMM yyyy")}</td>
        <td>
          {item.completed_date
            ? format(item.completed_date, "d MMM yyyy")
            : "-"}
        </td>
        <td>
          <button
            className="btn btn-ghost"
            onClick={() =>
              completeTaskMutation.mutate({
                taskId: item.id,
                isCompleted: item.is_completed,
              })
            }
            title="Check"
          >
            <SquareCheckBig />
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => handleShowModal(item.id)}
            title="Delete"
          >
            <Trash />
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div className="mb-4 flex flex-col items-center justify-center overflow-x-auto">
      <span className="mt-2">Welcome, {user?.username}!</span>
      <button
        className="btn btn-outline btn-primary my-2 w-40"
        onClick={handleCreateTask}
        title="Create task"
      >
        Create task
      </button>
      <TasksFilter />
      <table className="table table-zebra table-xs lg:table-md">
        <thead>
          <tr className="text-base-content">
            <th>Name</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Completed Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{tasksQuery.data.results.map((item) => renderRow(item))}</tbody>
      </table>
      <div className="flex gap-2">
        <button
          className="btn btn-outline btn-primary btn-sm my-2 w-40"
          onClick={handlePreviousPage}
          disabled={!tasksQuery.data.previous}
          title="Previous page"
        >
          Previous page
        </button>
        <button
          className="btn btn-outline btn-primary btn-sm my-2 w-40"
          onClick={handleNextPage}
          disabled={!tasksQuery.data.next}
          title="Next page"
        >
          Next page
        </button>
      </div>

      <dialog id="delete_modal" className="modal">
        <div className="modal-box flex flex-col">
          <h3 className="text-lg font-bold">DELETE</h3>
          <p className="py-4">Are you sure you want to delete this task?</p>
          <div className="flex gap-2 self-end">
            <button
              className="btn btn-outline btn-accent"
              onClick={handleDelete}
              title="Yes"
            >
              Yes
            </button>
            <button
              className="btn btn-outline"
              onClick={handleCloseModal}
              title="No"
            >
              No
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button title="Close">close</button>
        </form>
      </dialog>
    </div>
  );
};
