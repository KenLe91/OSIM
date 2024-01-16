import commonPage from "../pages/commonPage";
import productPage from "../pages/productPage";
import checkoutPage from "../pages/checkoutPage";
import businessToolPage from "../pages/businessToolPage";
import cartPage from "../pages/cartPage";
import loginPage from "../pages/loginPage";
import myAccountPage from "../pages/myAccountPage";
//const countryCode = ['sg', 'my', 'hk', 'tw', 'th']
const execution_country = Cypress.env('country');
describe('Verify checkout with :', () => {
        commonPage.load_data(execution_country).forEach(({ baseURL, country, urlCategoryPages, verifyProductDetails, firstName,
            lastName, city, address1, address2, postalCode, phoneNumber, isBillingAddress ,bizUrl ,bizUserName, bizPassword }) => {
            it(`Guest - Country: ${country}`, () => {
                const dayjs = require('dayjs');
                const emailDay = dayjs().format('YYYYMMDDHHmmss')
                productPage.gotoProductDetailPageviaCategory(baseURL, urlCategoryPages, verifyProductDetails)
                productPage.clickOnBuyNow();
                productPage.addToCart(country);
                if (execution_country == 'hk') {
                    cartPage.selectShippingMethodWithName('順豐站、順豐智能櫃或OSIM店自取');
                }
                productPage.clickCheckOutButton();
                checkoutPage.guestCheckoutDetails(firstName, lastName, "quyenlm2+" + emailDay + "@gmail.com", phoneNumber);
                checkoutPage.addDeliveryAddress(country, firstName, lastName, city, address1, address2, postalCode, phoneNumber, isBillingAddress)
                checkoutPage.reviewPayment(verifyProductDetails)
                checkoutPage.choosePaymentMethod('payment-method-0');
                checkoutPage.clickConfirmAndPay();
                checkoutPage.cancelPayment("American Express");
                //get orderID from Payment failed page
                cy.getOrderIdFromFailedPayment().then(orderIDFailed => {
                    //go to Biz Tool
                    cy.visit(bizUrl);
                    businessToolPage.loginBiz(bizUserName, bizPassword);
                    businessToolPage.clickMenuItem("Order Browser");
                    businessToolPage.selectShop("OSG");
                    businessToolPage.searchOrderId(orderIDFailed);
                })
            })
            it(`Account - Country: ${country}`, () => {
                const dayjs = require('dayjs');
                const emailDay = dayjs().format('YYYYMMDDHHmmss')
                cy.visit(baseURL+"login");
                loginPage.loginAccount("quyenlm2+5@smartosc.com","abc1234");
                cartPage.checkAndRemoveProducts();
                productPage.gotoProductDetailPageviaCategory(baseURL, urlCategoryPages, verifyProductDetails)
                productPage.clickOnBuyNow();
                productPage.addToCart(country);
                productPage.clickCheckOutButton();
                checkoutPage.addDeliveryAddress(country, firstName, lastName, city, address1, address2, postalCode, phoneNumber, isBillingAddress)
                checkoutPage.reviewPayment(verifyProductDetails)
                checkoutPage.choosePaymentMethod('payment-method-0');
                checkoutPage.clickConfirmAndPay();
                checkoutPage.cancelPayment("American Express");
                cy.getOrderIdFromFailedPayment().then(orderIDFailed => {
                    myAccountPage.checkOrderDeatails(baseURL,orderIDFailed)
                })
            })
        })
})
describe('Verify checkout with Trade In Program :', () => {
    commonPage.load_data("sg").forEach(({ baseURL, country, tradeInCategoryPage, tradeInProductName, firstName,
        lastName, city, address1, address2, postalCode, phoneNumber, isBillingAddress, tradeInImagePath, tradeInBrand, tradeInModel, bizUrl,
        bizUserName, bizPassword }) => {
        it(`Guest - Country: ${country}`, () => {
            //get value from date time for each run
            const dayjs = require('dayjs');
            const emailDay = dayjs().format('YYYYMMDDHHmmss')
            productPage.gotoProductDetailPageviaArticle(baseURL, tradeInCategoryPage, tradeInProductName)
            productPage.clickOnBuyNow();
            productPage.chooseColor(0);
            productPage.chooseWarranty(0);
            productPage.addTradeIn(tradeInImagePath, tradeInBrand, tradeInProductName, tradeInModel)
            productPage.addToCart(country);
            productPage.clickCheckOutButton();
            checkoutPage.guestCheckoutDetails(firstName, lastName, "quyenlm2+" + emailDay + "@gmail.com", phoneNumber);
            checkoutPage.addDeliveryAddress(country, firstName, lastName, city, address1, address2, postalCode, phoneNumber, isBillingAddress)
            checkoutPage.reviewPayment(tradeInProductName)
            checkoutPage.choosePaymentMethod(0);
            checkoutPage.clickConfirmAndPay();
            checkoutPage.cancelPayment("American Express");
            //get orderID from Payment failed page
            cy.getOrderIdFromFailedPayment((orderIDFailed) => {
                //go to Biz Tool
                cy.visit(bizUrl);
                businessToolPage.loginBiz(bizUserName, bizPassword);
                businessToolPage.clickMenuItem("Order Browser");
                businessToolPage.selectShop("OSG");
                businessToolPage.searchOrderId(orderId);
            })
        })
    })
})