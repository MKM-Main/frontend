describe("Can create a post from a profile", () => {
  beforeEach("Login and accept cookie", () => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);
    localStorage.setItem(
      "cookie_consent_accepted",
      JSON.stringify({ accepted: true, expires: expirationDate })
    );

    const user = {
      email: "malthegram22@gmail.com",
      password: "123",
    };
    cy.visit("http://localhost:5173/login");

    cy.get('input[type="email"]').wait(500).type(user.email);
    cy.get('input[type="password"]').type(user.password);
    cy.get('button[type="submit"]').click();

    cy.url().should("contain", "/news");
  });

  it("Can create a new user post", () => {
    cy.visit("http://localhost:5173/profile/Gram");
    cy.get(".btn-new-post").first().wait(1500).click();

    cy.get("#body").wait(1000).type("This is my awesome post!");

    cy.get('input[type="checkbox"').wait(600).click({ multiple: true });
    cy.get("#postBtn").wait(1500).click();
  });

  it("Can delete newly created post", () => {
    cy.visit("http://localhost:5173/profile/Gram");

    cy.get(".fa-trash").wait(500).first().click({});
  });
});
