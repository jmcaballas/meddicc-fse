import { useQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { z } from "zod";

import { fetchAPI } from "@/lib/api-client";
import { TaskSchema, TaskSearch } from "../types/tasks";

const getTasks = async (searchParams: TaskSearch) => {
  let url = `tasks/`;

  const queryParams: string[] = [];

  if (searchParams.task_name) {
    queryParams.push(`task_name=${searchParams.task_name}`);
  }
  if (searchParams.page && typeof searchParams.page !== "string") {
    queryParams.push(`page=${searchParams.page}`);
  }
  if (queryParams.length > 0) {
    url += `?${queryParams.join("&")}`;
  }

  const response: Response = await fetchAPI(url, {
    method: "GET",
    headers: {
      Authorization: `Token ${localStorage.getItem("accessToken")}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to get tasks");
  }

  const json = await response.json();

  const results = z.array(TaskSchema).parse(json.results);

  return { results, next: json.next, previous: json.previous };
};

export const useGetTasks = () => {
  const route = getRouteApi("/");
  const { page, task_name } = route.useSearch();

  const searchParams = {
    page: Number(page || ""),
    task_name: task_name || "",
  };

  return useQuery({
    queryKey: ["tasks", searchParams],
    queryFn: () => getTasks(searchParams),
  });
};
