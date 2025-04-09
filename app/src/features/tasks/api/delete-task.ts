import { useMutation, useQueryClient } from "@tanstack/react-query";

import { fetchAPI } from "@/lib/api-client";

export const deleteTask = async (id: number) => {
  const url = `tasks/${id}/`;

  const response: Response = await fetchAPI(url, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("accessToken")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }

  return;
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
};
