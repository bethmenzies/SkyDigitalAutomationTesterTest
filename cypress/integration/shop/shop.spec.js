/** Feature: This feature will make sure that the shop page is navigable and usable.
Scenario: User navigates to shop page
Given I am on the home page
When I navigate to ‘Deals’
Then the user should be on the https://www.sky.com/deals page 

Note: You will have to handle the ‘accept cookies’ in your test.
Home page is https://www.sky.com/
It is better to clear the cookies for sky.com or clear your web page history.


Scenario: User sees tiles on the shop page
Given I am on the home page
When I try to sign in with invalid credentials 
Then I should see a text saying that ‘Sorry, we did not recognise either your username or password’
(See Snapshot A)


Scenario: User sees a list of deals on the deals page 
Given I am on the ‘https://www.sky.com/deals‘ page 
Then I see a list of deals with a price to it (see Snapshot B)

For example:
“£27.50”, “£66.50”, “£42.50”
Note: Please change the offer prices if the page shows something different. Assert only the first 3 offers.
*/

describe('The shop page is navigable and usable', () => {

    it('user can navigate to the shop page', () => {

        // given I am on the home page
        cy.visit('/')

        cy.getIframeBody().find('.message-component message-button no-children').should('have.text', 'Accept').click()

        

    })
})