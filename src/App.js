import './App.css';
import { gql, useQuery } from '@apollo/client';

// GraphQL Query to fetch Todos with associated Users
const GET_TODOS_WITH_USERS = gql`
  query GetTodosWithUser {
    getTodos {
      id
      title
      completed
      user {
        name
        email
        phone
      }
    }
  }
`;

function App() {
  const { data, loading, error } = useQuery(GET_TODOS_WITH_USERS);

  // Show loading state
  if (loading) return <h1>Loading...</h1>;

  // Handle errors
  if (error) return <h1>Error: {error.message}</h1>;

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {data.getTodos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.title}</td>
              <td>{todo.user?.name || "No User"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
