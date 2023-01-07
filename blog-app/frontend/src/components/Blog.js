import PropTypes from "prop-types";

import { Link } from "react-router-dom";

function Blog({ blog }) {
  return (
    <div className="blog">
      <Link to={`/blogs/${blog.id}`}>
        <span className="blog__info">
          {blog.title} - {blog.author}
        </span>
      </Link>
    </div>
  );
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
