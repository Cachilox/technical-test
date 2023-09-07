import { useEffect, useState } from "react";
import "./App.css";
import { type User } from "./interface";
import { UsersList } from "./components";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false)

  const toggleColors = () => {
    setShowColors(!showColors);
  }

  useEffect(() => {
    fetch("https://randomuser.me/api?results=100")
      .then((res) => res.json())
      .then(res => {
        setUsers(res.results)
      })
      .catch(err => console.error(err))
      
  }, []);

  return (
    <>
      <h1>Technical test</h1>
      <header>
        <button onClick={toggleColors}>
          Toggle colors
        </button>
      </header>
      <main>
        <UsersList showColors={showColors} users={users} />
      </main>
    </>
  );
}

export default App;
