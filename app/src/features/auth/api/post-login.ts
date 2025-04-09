import { fetchAPI } from "@/lib/api-client";
import { LoginInputs } from "../types/auth";

export const postLogin = async (data: LoginInputs) => {
  const url = `auth/login/`;

  const response: Response = await fetchAPI(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to post login");
  }

  const json = await response.json();

  return json;
};
