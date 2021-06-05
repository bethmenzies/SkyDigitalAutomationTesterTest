// there is __tcfapi / CMP error causing the test to fail
Cypress.on('uncaught:exception', (err, runnable) => {
    // we expect a 3rd party library error with message '__tcfapi is not defined'
    // and don't want to fail the test so we return false
    if (err.message.includes('__tcfapi is not defined')) {
        return false
    }
    // we still want to ensure there are no other unexpected
    // errors, so we let them fail the test
})