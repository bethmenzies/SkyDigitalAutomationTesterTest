/* 
Feature: This feature will make the search show the results that are determined by editorial, as well as generic searches.

Scenario: User sees the editorial section in specific searches
Given I am on the home page
When I search ‘sky’ in the search bar
Then I should see an editorial section. (Note: Editorial section is the section highlighted in Snapshot C)
(Note: if ‘sky’ doesn’t work you can change it to ‘tv’)
*/

describe('search shows results as determined by editorial', () => {
    beforeEach (() => {
        cy.fixture('acceptCookieNotice').then((json) => {
            cy.intercept('GET', 'wrapper/tcfv2/v1/gdpr/native-message*', json)
        })
    })

    it('user sees the editorial section when searching for sky', () => {
        const viewport = Cypress.config('viewportWidth') < 1200 ? 'mobile' : 'desktop'

        // given I am on the home page
        cy.visit('/')

        // when I search 'sky' in the search bar
        if (Cypress.config('viewportWidth') < 1200) {
            cy.get('#burger-nav-toggle').click()
        } else {
            cy.get('#masthead-search-toggle').click()
        }
        cy.get('.search-wrapper').within(() => {
            cy.get('input').type('sky')
        })

        // then I should see an editorial section
        cy.get('[data-test-id=editorial-section]').as('editorial')
        cy.get('@editorial').should('exist').should('be.visible')
        cy.get('@editorial').within(() => {
            cy.contains('Sky Shop').should('have.prop', 'href').should('contain', 'search.sky.com/redirect?term=sky')
        })
        cy.get('@editorial').should('contain', 'Unlock the UK’s widest range of Ultra HD entertainment with Sky Q and multiscreen. Take a look at our best broadband deals and discover our range of Mobile phones and data plans.')
        cy.get('@editorial').within(() => {
            cy.get(`[data-test-id="editorial-${viewport}-link"]`).eq(0).should('have.text', 'TV').should('have.prop', 'href').should('contain', 'http://search.sky.com/redirect?term=sky&source=query&lid=11491&page=255c3f867ebc15630848845b2bae20129f41cea5564c207dba573da188d5abf607b8e7a1e18d085c6e1bb8088c7d9e9891144a76f10c1fc7ac885eb2fc296bda')
            cy.get(`[data-test-id="editorial-${viewport}-link"]`).eq(1).should('have.text', 'Broadband & Talk').should('have.prop', 'href').should('contain', 'http://search.sky.com/redirect?term=sky&source=query&lid=11491&page=255c3f867ebc15630848845b2bae20129f41cea5564c207d25225e82bee511e517871f6a112fd6709f3f163a0c11cd105f9a11626599aa52b36c538296cec9f6bb0172ce1ca33a534a0adb100e1c62fb')
            cy.get(`[data-test-id="editorial-${viewport}-link"]`).eq(2).should('have.text', 'TV, Broadband & Talk').should('have.prop', 'href').should('contain', 'http://search.sky.com/redirect?term=sky&source=query&lid=11491&page=255c3f867ebc15630848845b2bae20129f41cea5564c207d7be65ef088823bd206efaddedd7c2afa9f3f163a0c11cd105f9a11626599aa52b36c538296cec9f6bb0172ce1ca33a534a0adb100e1c62fb')
            cy.get(`[data-test-id="editorial-${viewport}-link"]`).eq(3).should('have.text', 'Mobile').should('have.prop', 'href').should('contain', 'http://search.sky.com/redirect?term=sky&source=query&lid=11491&page=03e108124a5d13e5909ea8d181f60b85a1d9678c0b6f4c343344ba552f998d0dfb1c3fd72fcca10afd0b10a9c696b77855371e5435684b021ec5deaa384fa4027ca93f97c1c86e30')
        })
    })

    it('user does not see the editorial section when searching for something generic', () => {
        // given I am on the home page
        cy.visit('/')

        // when I search 'help' in the search bar
        if (Cypress.config('viewportWidth') < 1200) {
            cy.get('#burger-nav-toggle').click()
        } else {
            cy.get('#masthead-search-toggle').click()
        }
        cy.get('.search-wrapper').within(() => {
            cy.get('input').type('help')
        })

        // then I should not see an editorial section
        cy.get('#search-results-container').should('exist').should('be.visible')
        cy.get('[data-test-id=editorial-section]').should('not.exist')
    })
})
