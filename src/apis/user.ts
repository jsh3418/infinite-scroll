import { User } from "../types/user";
import { fetcher } from "./fetcher";

type GetUsersParams = {
  size: number;
  page: number;
};

export type PaginationResponse<T> = {
  contents: T[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  isLastPage: boolean;
  isFirstPage: boolean;
};

export const getUsers = async ({
  size,
  page,
}: GetUsersParams): Promise<PaginationResponse<User>> => {
  const response = await fetcher(`/users?size=${size}&page=${page}`);

  return response.json();
};
