describe("Home", () => {
  it("should include title", () => {
    cy.visit("http://localhost:3000/");
    cy.get("h1").contains("Welcome");
  });
});
