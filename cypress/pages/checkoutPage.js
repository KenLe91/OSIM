import commonPage from "./commonPage";
class checkoutPage{
    FIRST_NAME = "input[name='firstName']";
    LAST_NAME = "input[name='lastName']";
    EMAIL = "input[name='email']";
    CITY = "input[name='City']";
    ADDRESS1 = "input[name='Address1']";
    ADDRESS2 = "input[name='Address2']";
    POSTAL_CODE = "input[name='Postcode']";
    DOB_DAY = "div[id='day']";
    DOB_DAY_MENU = "div#day > div.customization-dropdown__menu.css-26l3qy-menu > div.customization-dropdown__menu-list.css-11unzgr > div.customization-dropdown__option.css-yt9ioa-option";
    DOB_MONTH = "div[id='month']";
    DOB_MONTH_MENU = "div#month > div.customization-dropdown__menu.css-26l3qy-menu > div.customization-dropdown__menu-list.css-11unzgr > div.customization-dropdown__option.css-yt9ioa-option";
    DOB_YEAR = "div[id='year']";
    DOB_YEAR_MENU = "div#year > div.customization-dropdown__menu.css-26l3qy-menu > div.customization-dropdown__menu-list.css-11unzgr > div.customization-dropdown__option.css-yt9ioa-option";
    GENDER = "input[type='radio']";
    PHONE = "input[name='phoneNumber']";
    ISBILLING = "#auto-billing-address";
    guestSubmitButton = "#info-guest-checkout > div > div > button";
    AREA = "div[id='Area']";
    AREA_MENU = "div[id='Area'] > div > div.customization-dropdown__menu.css-26l3qy-menu > div.customization-dropdown__menu-list.css-11unzgr > div.customization-dropdown__option.css-yt9ioa-option";
    STATE_DROPDOWN = "#State";
    STATE_DROPDOWN_MENU = "#State > div > div.customization-dropdown__menu.css-26l3qy-menu > div.customization-dropdown__menu-list.css-11unzgr > div.customization-dropdown__option.css-yt9ioa-option";
    CITY_DROPDOWN = "div[id='City']"
    CITY_DROPDOWN_MENU = "div[id='City'] > div > div.customization-dropdown__menu.css-26l3qy-menu > div.customization-dropdown__menu-list.css-11unzgr > div.customization-dropdown__option.css-yt9ioa-option";
    termCondition = "#special-request-term-conditions";
    ACCOUNT_EMAIL = "input[name='emailLogin']";
    PASSWORD = "input[name='passwordLogin']";
    accountSubmitButton = ".account-checking__form__button > div > button";
    miniCartQty = ".header__right-contents__mini-cart.header-icon-bg > .header__right-contents__mini-cart__quantity";
    accountCheckoutDetails(accountEmail,passWord){
        cy.get("a[data-rb-event-key='returning-customer-key']").should('be.visible');
        cy.get("a[data-rb-event-key='returning-customer-key']").click();
        cy.get(this.ACCOUNT_EMAIL).type(accountEmail);
        cy.get(this.PASSWORD).type(passWord);
        cy.get(this.accountSubmitButton).eq(1).click();
        cy.wait(10000);
    }
    guestCheckoutDetails(firstName,lastName,email,phone){
        cy.get(this.FIRST_NAME,{ timeout: 1000 }).type(firstName);
        cy.get(this.LAST_NAME).type(lastName);
        cy.get(this.EMAIL).type(email);
        cy.get(this.DOB_DAY).click();
        cy.get(this.DOB_DAY_MENU).eq(4).click();
        cy.get(this.DOB_MONTH).click();
        cy.get(this.DOB_MONTH_MENU).eq(4).click();
        cy.get(this.DOB_YEAR).click();
        cy.get(this.DOB_YEAR_MENU).eq(4).click();
        cy.get(this.GENDER).first().click({force: true});
        cy.get(this.PHONE).type(phone);
        cy.get(this.guestSubmitButton).click();
        cy.url().should('include','delivery');
    }
    addDeliveryAddress(countryCode,firstName,lastName,city,address1,address2,postalCode,phone, isBillingAddress){
        cy.get('.my-addresses__section__btn-add').should('be.visible')
        cy.get('.my-addresses__section__btn-add').eq(0).click();
        cy.get('.modal-dialog').should('be.visible')
        cy.wait(2000);
        cy.get("input[name='LastName']").type(lastName);
        cy.get("input[name='FirstName']").type(firstName);
        cy.get(this.ADDRESS1).type(address1);
        cy.get("input[name='PhoneNumber']").type(phone);
        if(isBillingAddress == "yes"){
            cy.get(this.ISBILLING).check({force: true});
        }
        if(countryCode == "my"){
            cy.get(this.POSTAL_CODE).type(postalCode);
            cy.get(this.STATE_DROPDOWN).click();
            cy.get(this.STATE_DROPDOWN_MENU).eq(0).click();
            cy.wait(3000);
            cy.get(this.CITY_DROPDOWN).click();
            cy.get(this.CITY_DROPDOWN_MENU).eq(0).click();
            cy.get("button[type='submit']").should('be.visible')
            cy.get("button[type='submit']").eq(1).click();
            cy.get(".my-address__btn.text-center > button").should('be.visible')
            cy.get(".my-address__btn.text-center > button").eq(0).click()  
        }
        if(countryCode == "tw"){
            cy.get(this.CITY).type(city);
            cy.get(this.POSTAL_CODE).type(postalCode);
            cy.get("button[type='submit']").should('be.visible')
            cy.get("button[type='submit']").click(); 
        }
        if(countryCode == "sg"){
            cy.get(this.ADDRESS2).type(address2);
            cy.get(this.POSTAL_CODE).type(postalCode);
            cy.get("button[type='submit']").should('be.visible')
            cy.get("button[type='submit']").click(); 
        }
        if(countryCode == "hk"){
            cy.get(this.ADDRESS2).type(address2);
            cy.get(this.CITY_DROPDOWN).click();
            cy.get(this.CITY_DROPDOWN_MENU).eq(0).click();
            cy.wait(5000)
            cy.get("button[type='submit']").should('be.visible')
            cy.get("button[type='submit']").eq(1).click();
            cy.get(".my-address__btn.text-center > button").should('be.visible')
            cy.get(".my-address__btn.text-center > button").eq(0).click()        
            }
    }
    reviewPayment(nameProduct){
        cy.wait(2000);
        cy.get(".account-checking__form__button__submit.text-center > a").should('be.visible');
        cy.get(".account-checking__form__button__submit.text-center > a").click();
        cy.wait(5000);
        cy.get(".delivery-component.review-payment > div > div[class='delivery-component__header']").should('be.visible');
        cy.get(".delivery-component.review-payment > div > div[class='delivery-component__header']").click({force: true});
        cy.get('.product-list.large-text > div').eq(0).find('.product-list__header__name').should('be.visible');
        cy.get('.product-list.large-text > div').eq(0).find('.product-list__header__name').should('have.text',nameProduct); 
    }
    choosePaymentMethod(position){
        cy.get('.payment-method__content__group__list > li').eq(position).find('.payment-method__item__radio.osim-radio').should('be.visible');
        cy.get('.payment-method__content__group__list > li').eq(position).find('.payment-method__item__radio.osim-radio').click();
        cy.wait(5000)
    }
    clickConfirmAndPay(){
        cy.get(this.termCondition).check({force: true});
        cy.get('.product-list__header__name').should('be.visible');
        cy.get('.account-checking__form__button__submit.text-center').click();
        cy.wait(10000);
    }
    cancelPayment(paymentName){
        if(paymentName == "American Express"){
            cy.get(`a[href="javascript:formSubmit('AMEX');"]`).should('be.visible');
            cy.get(`a[href="javascript:formSubmit('AMEX');"]`).click();
            cy.get(`input[value='Cancel']`).should('be.visible');
            cy.get(`input[value='Cancel']`).click();
            cy.on('window:confirm', (str) => {
                expect(str).to.eq('Cancel payment?')
                // return false to deny
            })
            // cy.get('.payment-fail__content__instruction-message').should('be.visible');
            // cy.get('.account-quick-access-menu > a').should('exist');
            // cy.get('.account-quick-access-menu > a').invoke('attr', 'href').then(($href) => {
            //     let url = commonPage.getOrderIDFromHref($href);
            //     cy.wrap(url).as('orderID')
            // });
        }
    }
}
export default new checkoutPage();