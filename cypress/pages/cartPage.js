class cartPage {
    minicartIcon = ".header__right-contents__mini-cart.header-icon-bg";
    minicartEmpty = "div.cart-mini__header.cart-emty";
    miniCartItem = ".cart-mini__item";
    viewCart = ".cart-mini__button > a";
    cartRemove = ".cart-item-information__body__remove-btn";
    cartRemovePopup = ".confirm-remove-cart > .btn-remove-cart";
    btnCheckoutDisable = ".cart-head-info__button > .cart-head-info__link.btn.btn-disable";
    deliveryOption = ".cart-item-delivery__option";
    couponCode = "#couponCodeValue";
    btncouponCodeApply = "//input[@id='couponCodeValue']/../button";
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
    selectShippingMethodWithName(shippingName){
        cy.get(this.deliveryOption).should('be.visible');
        cy.xpath(`//label[contains(text(),'${shippingName}')]`).click();
        cy.wait(5000)
    }
    inputCouponCode(couponCode){
        cy.get(this.couponCode).should('be.visible');
        cy.get(this.couponCode).type(couponCode);
        cy.xpath(this.btncouponCodeApply).click();
    }
}
export default new cartPage();