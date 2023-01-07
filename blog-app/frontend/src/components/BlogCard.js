import { LinkContainer } from "react-router-bootstrap";
import Card from "react-bootstrap/Card";

function BlogCard({ blog }) {
  return (
    <LinkContainer to={`/blogs/${blog.id}`} style={{ cursor: "pointer" }}>
      <Card className="blog">
        <Card.Body className="blog__info">
          <blockquote className="blockquote mb-0">
            <p>{blog.title}</p>
            {blog.author && (
              <footer className="blockquote-footer">{blog.author}</footer>
            )}
          </blockquote>
        </Card.Body>
      </Card>
    </LinkContainer>
  );
}

export default BlogCard;
