class myAccountPage{
    checkOrderDeatails(baseURL,orderID){
        cy.visit(baseURL+'my-account');
        cy.xpath(`//h4[text()[contains(.,'${orderID}')]]`).should('be.visible');
        cy.xpath(`//h4[text()[contains(.,'${orderID}')]]/../a`).click();
        cy.xpath(`//h2[text()[contains(.,'${orderID}')]]`).should('be.visible');
    }
}
export default new myAccountPage();