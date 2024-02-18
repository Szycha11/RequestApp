

describe('E2E - API tests', () => {

  beforeEach( function() {
      cy.fixture("example").then(data => {
        this.daneApi = data;
      })
  } )


  it('API tags verification', () => {
    cy.intercept("GET", "https://api.realworld.io/api/tags").as("requestTag");
    cy.visit("https://angularjs.realworld.io/#/");
    cy.wait("@requestTag");
    cy.get("@requestTag").then(res => {
        console.log(res)
        expect(res.response.statusCode).to.equal(200);
        expect(res.response.body.tags).to.contain("est").and.to.contain("enim")

    })
  })


  it("Incorrect login", function() {
    cy.visit("https://angularjs.realworld.io/#/");
    cy.intercept("POST", "https://api.realworld.io/api/users/login").as("requestLogin");
    cy.get('a.nav-link').contains("Sign in").click();
    cy.login("test1234@test.pl", "1234#");
    cy.wait("@requestLogin");
    cy.get("@requestLogin").then(res => {
        console.log(res)
        expect(res.response.statusCode).to.equal(403);
        expect(res.response.statusMessage).to.equal(this.daneApi.statusMessage403);

    } )  

  })

})

