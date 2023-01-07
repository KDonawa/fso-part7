import { useState } from "react";
import { useEffect } from "react";
import userService from "../services/users";
import { LinkContainer } from "react-router-bootstrap";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function initializeUsers() {
      const data = await userService.getAll();
      setUsers(data);
    }
    initializeUsers();
  }, []);

  return users.length === 0 ? null : (
    <div>
      <h2>Users</h2>

      <Stack gap={3}>
        {users.map((user) => {
          return (
            <LinkContainer
              key={user.id}
              to={user.id}
              style={{ cursor: "pointer" }}
            >
              <Card>
                <Card.Body>
                  <blockquote className="blockquote mb-0">
                    <p> {user.name}</p>
                    <footer className="blockquote-footer">{`Blogs created : ${user.blogs.length}`}</footer>
                  </blockquote>
                </Card.Body>
              </Card>
            </LinkContainer>
          );
        })}
      </Stack>
    </div>
  );
}

export default Users;
