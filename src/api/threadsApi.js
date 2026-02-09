import apiClient from "./apiClient";

// Ambil semua thread
export const getAllThreads = async () => {
  const response = await apiClient.get("/threads");
  return response.data.data.threads;
};

// Ambil detail thread
export const getThreadById = async (threadId) => {
  const response = await apiClient.get(`/threads/${threadId}`);
  return response.data.data.detailThread;
};

// Buat thread baru
export const createThread = async ({ title, body, category }) => {
  const response = await apiClient.post("/threads", {
    title,
    body,
    category,
  });
  return response.data.data.thread;
};

export const deleteThread = async (threadId) => {
  const response = await apiClient.delete(`/threads/${threadId}`);
  return response.data;
};

// Vote thread
export const voteThread = async (threadId, voteType) => {
  const urlMap = {
    1: "up-vote",
    0: "neutral-vote",
    "-1": "down-vote",
  };

  const response = await apiClient.post(
    `/threads/${threadId}/${urlMap[voteType]}`,
  );

  return response.data.data.vote;
};
