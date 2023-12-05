class loginPage{
    registerTab = "a[data-rb-event-key='osim-account-register']";
    loginTab = "a[data-rb-event-key='osim-account-login']";
    FIRST_NAME = "input[name='firstName']";
    LAST_NAME = "input[name='lastName']";
    EMAIL = "input[name='email']";
    DOB_DAY = "div[id='day']";
    DOB_DAY_MENU = "div#day > div.customization-dropdown__menu.css-26l3qy-menu > div.customization-dropdown__menu-list.css-11unzgr > div.customization-dropdown__option.css-yt9ioa-option";
    DOB_MONTH = "div[id='month']";
    DOB_MONTH_MENU = "div#month > div.customization-dropdown__menu.css-26l3qy-menu > div.customization-dropdown__menu-list.css-11unzgr > div.customization-dropdown__option.css-yt9ioa-option";
    DOB_YEAR = "div[id='year']";
    DOB_YEAR_MENU = "div#year > div.customization-dropdown__menu.css-26l3qy-menu > div.customization-dropdown__menu-list.css-11unzgr > div.customization-dropdown__option.css-yt9ioa-option";
    GENDER = "input[type='radio']";
    PHONE = "input[name='phone']";
    PASSWORD = "input[name='password']";
    btnSubmit = "button[type='submit']";

    EMAIL_LOGIN = "#emailLogin"
    PASSWORD_LOGIN = "#passwordLogin"
    btnLogin = ".osim-account-form__form__btn__item.btn.btn-primary:not([type])"
    registerAccount (firstName,lastName,email,phone,password){
        cy.get(this.registerTab).should('be.visible');
        cy.wait(3000);
        cy.get(this.registerTab).click();
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
        cy.get(this.PASSWORD).type(password);
        cy.wait(5000)
        cy.get(this.reCAPTCHA).should('be.visible');
        cy.get(this.reCAPTCHA).solveGoogleCAPTCHA();
        //cy.get(this.btnSubmit).click({ multiple: true });
    }
    loginAccount(email,passWord){
        cy.get(this.loginTab).should('be.visible');
        cy.wait(3000);
        cy.get(this.loginTab).click();
        cy.get(this.EMAIL_LOGIN).type(email);
        cy.get(this.PASSWORD_LOGIN).type(passWord);
        cy.get(this.btnLogin).click({force: true});
    }
}
export default new loginPage();