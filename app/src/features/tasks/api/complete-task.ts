import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchAPI } from "@/lib/api-client";

export const completeTask = async ({
  taskId,
  isCompleted,
}: {
  taskId: number;
  isCompleted: boolean;
}) => {
  const url = `tasks/${taskId}/`;

  const data = {
    is_completed: !isCompleted,
    completed_date: isCompleted ? null : new Date().toISOString(),
  };

  const response: Response = await fetchAPI(url, {
    method: "PATCH",
    headers: {
      Authorization: `Token ${localStorage.getItem("accessToken")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to complete task");
  }

  const json = await response.json();

  return json;
};

export const useCompleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      taskId,
      isCompleted,
    }: {
      taskId: number;
      isCompleted: boolean;
    }) => completeTask({ taskId, isCompleted }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
};
