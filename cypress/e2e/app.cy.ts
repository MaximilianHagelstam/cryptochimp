describe("Home", () => {
  it("should include title", () => {
    cy.visit("http://localhost:3000/");
    cy.get("button").should("be.visible");
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
