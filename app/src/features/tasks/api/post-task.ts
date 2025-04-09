import { useMutation, useQueryClient } from "@tanstack/react-query";

import { fetchAPI } from "@/lib/api-client";
import { TaskInput } from "../types/tasks";

export const postTask = async (data: TaskInput) => {
  const url = `tasks/`;

  const response: Response = await fetchAPI(url, {
    method: "POST",
    headers: {
      Authorization: `Token ${localStorage.getItem("accessToken")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to post task");
  }

  const json = await response.json();

  return json;
};

export const usePostTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TaskInput) => postTask(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
};
