import { type User } from "../interface";

interface UserListProps {
  users: User[];
  showColors: boolean;
  deleteUser: (email: string) => void
}

const UserList = ({ users, showColors, deleteUser }: UserListProps) => {
  return (
    <table width="100%">
      <thead>
        <tr>
          <th>Photo</th>
          <th>Name</th>
          <th>Last name</th>
          <th>Country</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user, index) => {
          const backgroundColor = index % 2 === 0 ? "#333" : "#555";

          const cellColor = showColors ? backgroundColor : "transparent";
          return (
            <tr style={{ backgroundColor: cellColor }} key={user.email}>
              <td>
                <img src={user.picture.thumbnail} alt={user.name.first} />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button onClick={() => deleteUser(user.email)}>Delete</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UserList;
