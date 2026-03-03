import { apiFetch } from "@/lib/api";

export function createUser(data: CreateUserDTO) {
  return apiFetch("/users", {
    method: "POST",
    body: JSON.stringify(data),
  });
}