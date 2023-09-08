import { useEffect, useRef, useState } from "react";
import "./App.css";
import { type User } from "./interface";
import { UsersList } from "./components";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sortByCountry, setSortByCountry] = useState(false);
  const originalUsers = useRef<User[]>([])

  const toggleColors = () => {
    setShowColors(!showColors);
  };

  const toggleSortByCountry = () => {
    setSortByCountry((prev) => !prev);
  };
  
  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email)
    setUsers(filteredUsers)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  useEffect(() => {
    fetch("https://randomuser.me/api?results=100")
      .then((res) => res.json())
      .then((res) => {
        setUsers(res.results);
        originalUsers.current = res.results
      })
      .catch((err) => console.error(err));
  }, []);

  const sortedUsers = sortByCountry
    ? users.toSorted((a, b) => {
        return a.location.country.localeCompare(b.location.country);
      })
    : users;

  return (
    <>
      <h1>Technical test</h1>
      <header>
        <button onClick={toggleColors}>Toggle colors</button>
        <button onClick={toggleSortByCountry}>
          {sortByCountry ? "Do not sort by country" : "Sort by country"}
        </button>
        <button onClick={handleReset}>
          Reset state
        </button>
      </header>
      <main>
        <UsersList deleteUser={handleDelete} showColors={showColors} users={sortedUsers} />
      </main>
    </>
  );
}

export default App;
