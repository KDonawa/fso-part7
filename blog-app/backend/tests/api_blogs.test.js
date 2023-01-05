const { api, db, AuthenticateUser } = require("./api_setup");
const Blog = require("../models/blog");
const User = require("../models/user");

let authenticatedUser = null;

const initialBlogs = [
  {
    title: "Blog1",
    author: "Author1",
    url: "/",
    likes: 1,
  },
  {
    title: "Blog2",
    author: "Author2",
    url: "/",
    likes: 2,
  },
];
const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs;
};
const populateDB = async function () {
  await Promise.all([User.deleteMany({}), Blog.deleteMany({})]);
  authenticatedUser = await AuthenticateUser();

  const user = await User.findById(authenticatedUser.id);
  for (const blog of initialBlogs) {
    blog.user = authenticatedUser.id;
    const savedBlog = await new Blog(blog).save();
    user.blogs.push(savedBlog._id);
  }
  await user.save();
};

describe("Token authentication", () => {
  beforeAll(async () => {
    await Promise.all([User.deleteMany({}), Blog.deleteMany({})]);
    authenticatedUser = await AuthenticateUser();
  });
  test("Valid token in POST request should return with status 201", async () => {
    const newBlog = initialBlogs[0];
    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${authenticatedUser.token}`)
      .send(newBlog)
      .expect(201);
  });

  test("Invalid token should fail with status 401", async () => {
    const newBlog = initialBlogs[0];
    const token = null;
    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${token}`)
      .send(newBlog)
      .expect(401);
  });
});

describe("Retrieving data from db", () => {
  beforeAll(async () => {
    await populateDB();
  });

  test("retrieving all blogs succeeds with status 200 and have a response body of type JSON", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test("blogs returned should have an id property defined", async () => {
    const response = await api.get("/api/blogs").expect(200);

    expect(response.body[0].id).toBeDefined();
  });

  test("blogs retrieved should have info about its owner", async () => {
    const response = await api.get(`/api/blogs`);

    const result = response.body[0].user;
    expect(result).toEqual({
      username: authenticatedUser.username,
      name: authenticatedUser.name,
      id: authenticatedUser.id,
    });
  });

  test("retrieving a specific blog succeeds with status 200 when a valid id is given", async () => {
    const blogsAtStart = await blogsInDb();
    const blogId = blogsAtStart[0].id;

    const response = await api.get(`/api/blogs/${blogId}`).expect(200);

    expect(blogId).toEqual(response.body.id);
  });
});

describe("Deleting and updating db entries", () => {
  beforeAll(async () => {
    await populateDB();
  });

  test("deleting an existing blog succeeds with status code 204 if id is valid", async () => {
    const blogsAtStart = await blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `bearer ${authenticatedUser.token}`)
      .expect(204);

    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1);
  });

  test("updating an existing blog succeeds with status code 200 if id is valid", async () => {
    const blogsAtStart = await blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    const expectedLikes = blogsAtStart[0].likes + 1;

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set("Authorization", `bearer ${authenticatedUser.token}`)
      .send({ likes: expectedLikes })
      .expect(200);

    expect(response.body.title).toBe(blogToUpdate.title);
    expect(response.body.likes).toBe(expectedLikes);
  });
});

describe("Adding blogs to db", () => {
  beforeAll(async () => {
    await Promise.all([User.deleteMany({}), Blog.deleteMany({})]);

    authenticatedUser = await AuthenticateUser();
  });
  test("Succeeds with status 201 when valid data is provided", async () => {
    const blogsAtStart = await blogsInDb();
    const newBlog = {
      title: "Blog",
      url: "/",
    };
    const response = await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${authenticatedUser.token}`)
      .send(newBlog)
      .expect(201);

    expect(response.body.title).toBe("Blog");

    const blogsAtEnd = await blogsInDb();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1);
  });

  test("Request with likes property missing will default to a value of zero", async () => {
    const newBlog = {
      title: "Blog With No Likes",
      url: "/",
    };
    const response = await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${authenticatedUser.token}`)
      .send(newBlog);

    expect(response.body.title).toBe("Blog With No Likes");
    expect(response.body.likes).toBe(0);
  });

  test("fails with status code 400 if missing title or url", async () => {
    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${authenticatedUser.token}`)
      .send({ author: "A", url: "/" })
      .expect(400);
    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${authenticatedUser.token}`)
      .send({ title: "T", author: "A" })
      .expect(400);
    await api
      .post("/api/blogs")
      .set("Authorization", `bearer ${authenticatedUser.token}`)
      .send({})
      .expect(400);
  });
});

afterAll(() => {
  db.connection.close();
});
