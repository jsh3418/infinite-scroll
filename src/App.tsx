import { useCallback, useState } from "react";
import { PaginationResponse, getUsers } from "./apis/user";
import { IntersectionObserverComponent } from "./components/IntersectionObserverComponent";
import { User } from "./types/user";

function App() {
  const [pagingData, setPagingData] = useState<PaginationResponse<User>>({
    contents: [],
    pageNumber: 0,
    pageSize: 50,
    totalPages: 0,
    totalCount: 0,
    isLastPage: false,
    isFirstPage: false,
  });

  const onFetch = useCallback(async () => {
    if (pagingData.isLastPage) return;

    const users = await getUsers({
      size: pagingData.pageSize,
      page: pagingData.pageNumber,
    });

    setPagingData((prev) => ({
      contents: [...prev.contents, ...users.contents],
      pageNumber: users.pageNumber + 1,
      pageSize: users.pageSize,
      totalPages: users.totalPages,
      totalCount: users.totalCount,
      isLastPage: users.isLastPage,
      isFirstPage: users.isFirstPage,
    }));
  }, [pagingData]);

  return (
    <>
      {pagingData.contents.map((user) => {
        return <div key={user.id}>{user.name}</div>;
      })}
      <IntersectionObserverComponent callback={onFetch} />
    </>
  );
}

export default App;
