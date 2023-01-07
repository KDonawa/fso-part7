import { useLoaderData } from "react-router-dom";
import userService from "../services/users";
import BlogCard from "../components/BlogCard";
import Stack from "react-bootstrap/Stack";

function User() {
  const user = useLoaderData();

  return (
    <div>
      <h3>{user.name} - blogs</h3>
      <Stack gap={3}>
        {user.blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </Stack>
    </div>
  );
}

export async function loader({ params }) {
  return await userService.getById(params.id);
}

export default User;
