import { useLoaderData } from "react-router-dom";
import userService from "../services/users";
import { Link } from "react-router-dom";

function User() {
  const user = useLoaderData();

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function loader({ params }) {
  return await userService.getById(params.id);
}

export default User;
