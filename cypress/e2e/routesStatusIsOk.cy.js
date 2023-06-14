describe("GET requests to profile and forum routes", () => {
  it("Returns a 200 status for existing profile", function () {
    cy.request({
      method: "GET",
      url: "http://localhost:5173/profile/Gram",
      failOnStatusCode: false,
    })
      .its("status")
      .should("equal", 200);
  });

  it("Returns a 200 status for existing forum", function () {
    cy.request({
      method: "GET",
      url: "http://localhost:5173/forum/New-Releases",
      failOnStatusCode: false,
    })
      .its("status")
      .should("equal", 200);
  });
});
