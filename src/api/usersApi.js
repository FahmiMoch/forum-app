import apiClient from "./apiClient";

export const getAllUsers = async () => {
  const response = await apiClient.get("/users");
  return response.data.data.users; // 🔥 LANGSUNG ARRAY
};
