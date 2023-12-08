import loginPage from "../pages/loginPage";
import commonPage from "../pages/commonPage";
import cartPage from "../pages/cartPage";
const dayjs = require('dayjs')
const countryCode = ['sg' , 'th' , 'hk' , 'my' , 'tw']

describe('Login Page:', () => {
    countryCode.forEach((countryCode) => {
        commonPage.load_data(countryCode).forEach(({baseURL,emailLogin,passwordLogin} ) => {
            it(`Country: ${baseURL}`, () => {
                cy.visit(baseURL+"login");
                loginPage.loginAccount("quyenlm2+5@smartosc.com","abc1234");
                cartPage.checkAndRemoveProducts();
                //loginPage.registerAccount("aaaaa","ksjahdkjasd","quyenlm@mail.com","98739827" ,"abc1234")
                //loginPage.loginAccount(emailLogin,passwordLogin);
            })
        })
    })  
})