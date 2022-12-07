describe("Home", () => {
  it("should include title", () => {
    cy.visit("http://localhost:3000/");
    cy.get("h1").contains("Welcome");
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
