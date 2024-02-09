import { BASE_URL } from "../constants/baseUrl";

export const fetcher = async (path: string, options?: RequestInit) => {
  const response = await fetch(BASE_URL + path, options);

  return response;
};
