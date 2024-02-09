import { http } from "msw";
import { BASE_URL } from "../constants/baseUrl";

const users = Array.from(Array(1024).keys()).map((id) => ({
  id,
  name: `khundi${id}`,
}));

export const handlers = [
  http.get(`${BASE_URL}/users`, async ({ request }) => {
    const url = new URL(request.url);
    const size = Number(url.searchParams.get("size"));
    const page = Number(url.searchParams.get("page"));
    const totalCount = users.length;
    const totalPages = Math.round(totalCount / size);

    return new Response(
      JSON.stringify({
        contents: users.slice(page * size, (page + 1) * size),
        pageNumber: page,
        pageSize: size,
        totalPages,
        totalCount,
        isLastPage: totalPages <= page,
        isFirstPage: page === 0,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }),
];
