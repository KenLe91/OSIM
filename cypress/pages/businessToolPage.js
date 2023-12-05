class businessToolPage{
    loginPage =  ".login-page";
    userName = "#Username";
    passWord = "#Password";
    btnLogin = ".btn.btn-primary";
    h3SiteCore = `//h3[contains(text(),'Sitecore Experience Commerce')]`
    orderBrowser_orderId = "#property-OrderId";
    orderBrowser_dropDownShop = "#dropdown-shops";
    orderBrowser_searchResult = ".search-result-total";
    orderBrowser_btnSubmit = "//button[contains(text(),'Submit')]";

    loginBiz(userName,passWord){
        cy.get(this.loginPage).should('be.visible');
        cy.wait(3000);
        cy.get(this.userName).type(userName);
        cy.get(this.passWord).type(passWord);
        cy.get(this.btnLogin).click({force: true});
        cy.xpath(this.h3SiteCore).should('be.visible');
        cy.wait(5000);
    }
    selectShop(shopId){
        cy.get(this.orderBrowser_dropDownShop).should('be.visible');
        cy.get(this.orderBrowser_dropDownShop).select(shopId).should('have.value',shopId);
    }
    clickMenuItem(itemName){
        cy.xpath(`//sc-menu-item[@title='${itemName}']/li/a`).should('be.visible');
        cy.xpath(`//sc-menu-item[@title='${itemName}']/li/a`).click();
        
    }
    searchOrderId(orderID){
        cy.get(this.orderBrowser_orderId).should('be.visible');
        cy.get(this.orderBrowser_orderId).type(orderID);
        cy.wait(1000);
        cy.xpath(this.orderBrowser_btnSubmit).click();
        cy.wait(1000);
        cy.get(this.orderBrowser_searchResult).should("have.text","Total 1 items");
        cy.xpath(`//div[contains(@class, 'property property-default ng-star-inserted') and contains(text(), '${orderID}')]`).should('be.visible');
        cy.xpath(`//div[contains(@class, 'property property-default ng-star-inserted') and contains(text(), '${orderID}')]`).click();
        cy.xpath(`//h3[@class="app-header-text" and contains(text(),'${orderID}')]`).should('be.visible');
    }
}
export default new businessToolPage();