describe('GET requests to forum and profile routes', () => {
    it('Returns a 404 status for non-existent forum', () => {
        cy.request({
            method: 'GET',
            url: 'http://localhost:5173/forum/Vi-elsker-Drake',
            failOnStatusCode: false
        })
            .then((response) => {
                expect(response.status).to.eq(404)
            })
    })

    it('Returns a 404 status for non-existent profile', () => {
        cy.request({
            method: "GET",
            url: "http://localhost:5173/profile/ABC",
            failOnStatusCode: false
        })
            .then((response) => {
                expect(response.status).to.eq(404)
            })
    })
})
