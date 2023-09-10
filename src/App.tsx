import { useMemo, useState } from "react";
import { SortBy, type User } from "./interface";
import { UsersList } from "./components";
import { useUsers } from "./hooks";
import "./App.css";

function App() {
  const { users, fetchNextPage, hasNextPage, isError, isLoading, refetch } = useUsers();
  const [showColors, setShowColors] = useState(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);
  const [deletedUsers, setDeletedUsers] = useState<string[]>([]);

  const toggleColors = () => {
    setShowColors(!showColors);
  };

  const toggleSortByCountry = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
    setSorting(newSortingValue);
  };

  const handleDelete = (email: string) => {
    setDeletedUsers([...deletedUsers, email]);
  };

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort);
  };

  const handleLoadMore = async () => {
    await fetchNextPage();
  };

  const handleReset = async () => {
    setDeletedUsers([]);
    setFilterCountry(null);
    setSorting(SortBy.NONE);
    await refetch();
  };

  const filteredUsers = useMemo(() => {
    return filterCountry !== null && filterCountry.length > 0
      ? users.filter((user: User) => {
          return (
            user.location.country
              .toLowerCase()
              .includes(filterCountry.toLowerCase()) &&
            !deletedUsers.includes(user.email)
          );
        })
      : users.filter((user: User) => !deletedUsers.includes(user.email));
  }, [filterCountry, users, deletedUsers]);

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers;

    const compareProperties: Record<string, (user: User) => string> = {
      [SortBy.COUNTRY]: (user) => user.location.country,
      [SortBy.NAME]: (user) => user.name.first,
      [SortBy.LAST]: (user) => user.name.last,
    };

    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting];
      return extractProperty(a).localeCompare(extractProperty(b));
    });
  }, [filteredUsers, sorting]);

  return (
    <>
      <h1>Technical test</h1>
      <header>
        <div className="button-container">
          <button onClick={toggleColors}>Toggle colors</button>
          <button onClick={toggleSortByCountry}>
            {sorting === SortBy.COUNTRY
              ? "Do not sort by country"
              : "Sort by country"}
          </button>

          <button onClick={handleReset}>Reset state</button>

          <input
            placeholder="Filter for country"
            type="text"
            onChange={(event) => {
              setFilterCountry(event.target.value);
            }}
          />
        </div>
      </header>
      <main>
        {users.length > 0 && (
          <UsersList
            deleteUser={handleDelete}
            showColors={showColors}
            users={sortedUsers}
            changeSorting={handleChangeSort}
          />
        )}

        {isError && <p className="loading">An error has occured</p>}

        {!isLoading && !isError && users.length === 0 && (
          <p className="loading">No users</p>
        )}

        {isLoading && <h2 className="loading">Loading...</h2>}

        {!isLoading && !isError && hasNextPage && (
          <button onClick={handleLoadMore}>Load more results</button>
        )}

        {!isLoading && !isError && !hasNextPage && (
          <div className="no-more-results">There are no more results</div>
        )}
      </main>
    </>
  );
}

export default App;
