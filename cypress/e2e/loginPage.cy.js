import loginPage from "../pages/loginPage";
import commonPage from "../pages/commonPage";
const dayjs = require('dayjs')
const countryCode = ['sg' , 'th' , 'hk' , 'my' , 'tw']

describe('Login Page:', () => {
    countryCode.forEach((countryCode) => {
        commonPage.load_data(countryCode).forEach(({baseURL,emailLogin,passwordLogin} ) => {
            it(`Country: ${baseURL},${emailLogin},${passwordLogin}`, () => {
                cy.visit(baseURL+"login");
                loginPage.registerAccount("aaaaa","ksjahdkjasd","quyenlm@mail.com","98739827" ,"abc1234")
                //loginPage.loginAccount(emailLogin,passwordLogin);
            })
        })
    })  
})