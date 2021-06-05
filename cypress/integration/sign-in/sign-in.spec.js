/* 
Scenario: User sees tiles on the shop page
Given I am on the home page
When I try to sign in with invalid credentials 
Then I should see a text saying that ‘Sorry, we did not recognise either your username or password’
(See Snapshot A)
*/

describe('User cannot sign in with invalid credentials', () => {
    beforeEach (() => {
        cy.fixture('acceptCookieNotice').then((json) => {
            cy.intercept('GET', 'wrapper/tcfv2/v1/gdpr/native-message*', json)
        })
    })

    it('user cannot sign in with invalid email and password', () => {
        // given I am on the home page
        cy.visit('/')

        // when I search click on sign in
        cy.get('[data-test-id=sign-in-link]').click()

        // then I should be taken to the sign in page
        cy.location('pathname').should('eq', '/signin')

        //given I am on the sign in page
        // when I try to sign in with invalid credentials
        cy.get('#username').type('a@b.com')
        cy.get('#password').type('password')
        cy.get('#signinButton').click()

        // then I should see a text saying that ‘Sorry, we did not recognise either your username or password’
        cy.get('.globalErrors').should('have.text', 'Sorry, we did not recognise either your username or password')
    })
})