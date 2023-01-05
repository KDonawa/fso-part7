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

  it("Login form is shown", function () {
    cy.contains("Log in to application");
    cy.contains("Login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type(user.username);
      cy.get("#password").type(user.password);
      cy.get(".login-btn").click();

      cy.contains(`${user.name} logged in`);
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type(user.username);
      cy.get("#password").type("wrong");
      cy.get(".login-btn").click();

      cy.get(".error")
        .should("contain", "Invalid username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");
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

      cy.contains(`${newBlog.title} ${newBlog.author}`);
    });

    describe("and a blog exists", function () {
      beforeEach(function () {
        cy.createBlog(newBlog);
      });

      it("it can be liked", function () {
        cy.contains("view").click();
        cy.get(".blog__likes").should("contain", "likes: 0");
        cy.get(".blog__like-btn").click();
        cy.get(".blog__likes").should("contain", "likes: 1");
      });

      it("it can be deleted by user who created it", function () {
        cy.contains("view").click();
        cy.get(".blog__delete-btn").click();
        cy.get("html").should("contain", "A blog was deleted");
        cy.get("html").should(
          "not.contain",
          `${newBlog.title} ${newBlog.author}`
        );
      });

      it("it cannot be deleted by user did not create it", function () {
        cy.get(".logout-btn").click();
        cy.request("POST", "http://localhost:3003/api/users", user2);
        cy.login(user2);
        cy.contains("view").click();
        cy.get("html").should("not.contain", "delete");
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
        cy.get(".blog")
          .eq(0)
          .should("contain", "Blog with with the least likes");
        cy.get(".blog")
          .eq(1)
          .should("contain", "Blog with with the most likes");

        cy.get(".blog").eq(1).contains("view").click();
        cy.get(".blog__like-btn").click();

        cy.get(".blog")
          .eq(0)
          .should("contain", "Blog with with the most likes");
        cy.get(".blog")
          .eq(1)
          .should("contain", "Blog with with the least likes");
      });
    });
  });
});
