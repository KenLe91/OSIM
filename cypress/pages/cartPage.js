class cartPage {
    minicartIcon = ".header__right-contents__mini-cart.header-icon-bg";
    minicartEmpty = "div.cart-mini__header.cart-emty";
    miniCartItem = ".cart-mini__item";
    viewCart = ".cart-mini__button > a";
    cartRemove = ".cart-item-information__body__remove-btn";
    cartRemovePopup = ".confirm-remove-cart > .btn-remove-cart";
    btnCheckoutDisable = ".cart-head-info__button > .cart-head-info__link.btn.btn-disable";
    checkAndRemoveProducts() {
        cy.wait(5000)
        //go on mini cart on header
        cy.get(this.minicartIcon).should('be.visible');
        cy.get(this.minicartIcon).click({ force: true });
        cy.isPresent(this.minicartEmpty).then(isPresent => {      // unwrap 
            if (isPresent == false) {  
                cy.get(this.viewCart).click({ force: true });
                cy.get(this.cartRemove).each(($remove) => {
                    cy.wrap($remove).click().then(() => {
                        cy.get(this.cartRemovePopup).should('be.visible');
                        cy.get(this.cartRemovePopup).click();
                        cy.wait(10000);
                    })
                })
                cy.get(this.btnCheckoutDisable).should('be.visible');
                cy.log("Removed All Products");
            }
            else{
                cy.log("Cart Is Empty");     
            }           
        })
    }
}
export default new cartPage();