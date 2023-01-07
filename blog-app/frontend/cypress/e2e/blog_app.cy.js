const user = {
  name: "Kerron Donawa",
  username: "kdonawa",
  password: "1234",
};
const user2 = {
  name: "Sydney Donawa",
  username: "sdonawa",
  password: "1234",
};
const newBlog = {
  title: "Blog Title",
  author: "Blog Author",
  url: "/url",
};

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:3000");
  });

  it("login form is shown on home page", function () {
    cy.contains("Log in");
    cy.contains("Login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type(user.username);
      cy.get("#password").type(user.password);
      cy.get(".login-btn").click();

      cy.contains("You have successfully logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type(user.username);
      cy.get("#password").type("wrong");
      cy.get(".login-btn").click();

      cy.contains("Invalid username or password");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login(user);
    });

    it("a blog can be created", function () {
      cy.contains("New blog").click();
      cy.get("#title").type(newBlog.title);
      cy.get("#author").type(newBlog.author);
      cy.get("#url").type(newBlog.url);
      cy.get(".blog-form__submit-btn").click();

      cy.get(".blog-card").should("contain", `${newBlog.title}`);
    });

    describe("and a blog exists", function () {
      beforeEach(function () {
        cy.createBlog(newBlog);
      });

      it("it can be liked", function () {
        cy.get(".blog__info").click();
        cy.get(".blog__like-btn").should("contain", "Likes: 0");
        cy.get(".blog__like-btn").click();
        cy.get(".blog__like-btn").should("contain", "Likes: 1");
      });

      it("it can be deleted by user who created it", function () {
        cy.get(".blog__info").click();
        cy.get("html").should("contain", `${newBlog.title}`);
        cy.get(".blog__delete-btn").click();
        cy.get("html").should("contain", "A blog was deleted");
        cy.get("html").should("not.contain", `${newBlog.title}`);
      });

      it("it cannot be deleted by user did not create it", function () {
        cy.get(".logout-btn").click();
        cy.request("POST", "http://localhost:3003/api/users", user2);
        cy.login(user2);
        cy.get(".blog__info").click();
        cy.get("html").should("not.contain", "Delete");
      });
    });

    describe("and multiple blogs exist", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "Blog with with the least likes",
          author: "A",
          url: "/",
        });
        cy.createBlog({
          title: "Blog with with the most likes",
          author: "B",
          url: "/",
        });
      });

      it("blogs are ordered according to likes with the blog with the most likes being first", function () {
        cy.get(".blog-card")
          .eq(0)
          .should("contain", "Blog with with the least likes");
        cy.get(".blog-card")
          .eq(1)
          .should("contain", "Blog with with the most likes");
        cy.get(".blog-card").eq(1).click();
        cy.get(".blog__like-btn").click();
        cy.go("back");
        cy.get(".blog-card")
          .eq(0)
          .should("contain", "Blog with with the most likes");
        cy.get(".blog-card")
          .eq(1)
          .should("contain", "Blog with with the least likes");
      });
    });
  });
});
