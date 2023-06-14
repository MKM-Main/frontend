describe("Login form", () => {
  before("Set cookie consent", () => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);
    localStorage.setItem(
      "cookie_consent_accepted",
      JSON.stringify({ accepted: true, expires: expirationDate })
    );
  });
  it("Allows user to login with valid credentials", () => {
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
});
