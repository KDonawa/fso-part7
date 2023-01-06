const router = require("express").Router();
const Blog = require("../models/blog");
const { userExtractor } = require("../utils/middleware");

router.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  res.json(blogs);
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  if (blog) {
    return res.json(blog);
  }
  res.status(404).end();
});

router.post("/", userExtractor, async (req, res) => {
  const user = req.user;

  const newBlog = new Blog({ ...req.body, user: user._id });
  const savedBlog = await newBlog.save();

  user.blogs.push(savedBlog._id);
  user.save();

  const blog = await savedBlog.populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });

  res.status(201).json(blog);
});

router.delete("/:id", userExtractor, async (req, res) => {
  const blogToDelete = await Blog.findById(req.params.id);
  if (!blogToDelete) {
    return response.status(204).end();
  }

  const user = req.user;
  if (user.id !== blogToDelete.user.toString()) {
    return response
      .status(401)
      .json({ error: "Not authorized to delete this blog" });
  }
  const deletedBlog = await Blog.findByIdAndRemove(req.params.id);

  user.blogs = user.blogs.filter(
    (blogObjId) => blogObjId.toString() !== deletedBlog.id
  );
  user.save();

  res.status(204).end();
});

router.put("/:id", userExtractor, async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    context: "query",
  }).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });

  res.json(updatedBlog);
});

module.exports = router;
