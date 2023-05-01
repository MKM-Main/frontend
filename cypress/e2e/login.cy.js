describe('Login form', () => {
    it('Allows user to login with valid credentials', () => {
        const user = {
            email: "malthegram22@gmail.com",
            password: "123"
        }
        cy.visit('http://localhost:5173/login')

        cy.get('input[type="email"]').wait(500).type(user.email)
        cy.get('input[type="password"]').type(user.password)
        cy.get('button[type="submit"]').click()

        cy.url().should("contain", "/news")
    })
})
