import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import { SortBy, type User } from "./interface";
import { UsersList } from "./components";
import { getUsers } from "./service/getUsers";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);
  const originalUsers = useRef<User[]>([]);

  const toggleColors = () => {
    setShowColors(!showColors);
  };

  const toggleSortByCountry = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
    setSorting(newSortingValue);
  };

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email);
    setUsers(filteredUsers);
  };

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort);
  };

  const handleReset = () => {
    setUsers(originalUsers.current);
  };

  useEffect(() => {
    getUsers()
      .then((res) => {
        setUsers(res.results);
        originalUsers.current = res.results;
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredUsers = useMemo(() => {
    return filterCountry !== null && filterCountry.length > 0
      ? users.filter((user) => {
          return user.location.country
            .toLowerCase()
            .includes(filterCountry.toLowerCase());
        })
      : users;
  }, [filterCountry, users]);

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
            onChange={(e) => {
              setFilterCountry(e.target.value);
            }}
          />
        </div>
      </header>
      <main>
        <UsersList
          deleteUser={handleDelete}
          showColors={showColors}
          users={sortedUsers}
          changeSorting={handleChangeSort}
        />
      </main>
    </>
  );
}

export default App;
