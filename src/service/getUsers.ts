export const fetchUsers = async ({ pageParam = 1 }: { pageParam?: number }) => {
  return await fetch(
    `https://randomuser.me/api?results=10&seed=cachilo&page=${pageParam}`
  )
    .then(async (res) => {
      if (!res.ok) throw new Error("Request failed");
      return await res.json();
    })
    .then((res) => {
      const currentPage = Number(res.info.page);
      const nextCursor = currentPage > 6 ? undefined : currentPage + 1;
      
      return {
        users: res.results,
        nextCursor,
      };
    });
};


