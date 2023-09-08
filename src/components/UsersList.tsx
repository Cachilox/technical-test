import { SortBy, type User } from "../interface";

interface UserListProps {
  users: User[];
  showColors: boolean;
  deleteUser: (email: string) => void;
  changeSorting: (sort: SortBy) => void;
}

const UserList = ({ users, showColors, deleteUser, changeSorting }: UserListProps) => {
  return (
    <table width="100%">
      <thead>
        <tr>
          <th>Photo</th>
          <th className="pointer" onClick={() => changeSorting(SortBy.NAME)}>Name</th>
          <th className="pointer" onClick={() => changeSorting(SortBy.LAST)}>Last name</th>
          <th className="pointer" onClick={() => changeSorting(SortBy.COUNTRY)}>Country</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody className={showColors ? "table--showColors" : ""}>
        {users.map((user) => {
          return (
            <tr key={user.phone}>
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
