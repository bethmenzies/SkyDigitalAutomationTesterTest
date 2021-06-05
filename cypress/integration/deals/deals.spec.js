/* Feature: This feature will make sure that the shop page is navigable and usable.
Scenario: User navigates to shop page
Given I am on the home page
When I navigate to ‘Deals’
Then the user should be on the https://www.sky.com/deals page 

Note: You will have to handle the ‘accept cookies’ in your test.
Home page is https://www.sky.com/
It is better to clear the cookies for sky.com or clear your web page history.


Scenario: User sees a list of deals on the deals page 
Given I am on the ‘https://www.sky.com/deals‘ page 
Then I see a list of deals with a price to it (see Snapshot B)

For example:
“£27.50”, “£66.50”, “£42.50”
Note: Please change the offer prices if the page shows something different. Assert only the first 3 offers.
*/

describe('The deals page is navigable and usable', () => {
    before (() => {
        cy.fixture('acceptCookieNotice').then((json) => {
            cy.intercept('GET', 'wrapper/tcfv2/v1/gdpr/native-message*', json)
        })
    })

    beforeEach(() => {
        Cypress.Cookies.preserveOnce('consentUUID')
    })

    it('user can navigate to the deals page and see deals', () => {
        // given I am on the home page
        cy.visit('/')

        // when I navigate to Deals
        if (Cypress.config('viewportWidth') < 1200) {
            cy.get('#burger-nav-toggle').click()
        }
        cy.contains('Deals').click()

        // then I should be on the https://www.sky.com/deals page 
        cy.location('pathname').should('eq', '/deals')

        cy.contains('Sky Deals').should('exist').should('be.visible')

        // given I am on the deals page
        // then I see a list of deals with prices
        cy.get('section.box__Box-eb0ezq-0').within(() => {
            cy.get('.box__Box-eb0ezq-0.jOIfJV').should('have.length', 6)
        })

        cy.get('.box__Box-eb0ezq-0.jOIfJV').eq(0).within(() => {
            cy.get('.text__Text-sc-1u9gciq-0.ebwAcM').should('contain', '£25')
        })

        cy.get('.box__Box-eb0ezq-0.jOIfJV').eq(1).within(() => {
            cy.get('.text__Text-sc-1u9gciq-0.ebwAcM').should('contain', '£43')
        })

        cy.get('.box__Box-eb0ezq-0.jOIfJV').eq(2).within(() => {
            cy.get('.text__Text-sc-1u9gciq-0.ebwAcM').should('contain', '£36')
        })
    })
})