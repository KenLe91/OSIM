import commonPage from "../pages/commonPage";
import productPage from "../pages/productPage";
import checkoutPage from "../pages/checkoutPage";
import businessToolPage from "../pages/businessToolPage";
const countryCode = ['sg', 'my', 'hk', 'tw', 'th']

describe('Verify checkout with :', () => {
    countryCode.forEach((countryCode) => {
        commonPage.load_data(countryCode).forEach(({ baseURL, country, urlCategoryPages, verifyProductDetails, firstName,
            lastName, city, address1, address2, postalCode, phoneNumber, isBillingAddress }) => {
            it(`Guest - Country: ${country}`, () => {
                const dayjs = require('dayjs');
                const emailDay = dayjs().format('YYYYMMDDHHmmss')
                productPage.gotoProductDetailPageviaCategory(baseURL,urlCategoryPages,verifyProductDetails)
                productPage.clickOnBuyNow();
                productPage.addToCart(country);
                productPage.clickCheckOutButton();
                checkoutPage.guestCheckoutDetails(firstName,lastName,"quyenlm2+"+emailDay+"@gmail.com",phoneNumber);
                checkoutPage.addDeliveryAddress(country,firstName,lastName, city,address1,address2,postalCode,phoneNumber,isBillingAddress)
                checkoutPage.reviewPayment(verifyProductDetails)
            })
            it(`Account - Country: ${country}`, () => {
                const dayjs = require('dayjs');
                const emailDay = dayjs().format('YYYYMMDDHHmmss')
                productPage.gotoProductDetailPageviaCategory(baseURL,urlCategoryPages,verifyProductDetails)
                productPage.addToCart(country);
                productPage.clickCheckOutButton();
                checkoutPage.accountCheckoutDetails("quyenlm2+5@smartosc.com","abc1234")
                checkoutPage.addDeliveryAddress(country,firstName,lastName, city,address1,address2,postalCode,phoneNumber,isBillingAddress)
                checkoutPage.reviewPayment(verifyProductDetails)               
            })
        })
    })
})
describe('Verify checkout with Trade In Program :', () => {
    commonPage.load_data("sg").forEach(({ baseURL, country, tradeInCategoryPage, tradeInProductName, firstName,
        lastName, city, address1, address2, postalCode, phoneNumber, isBillingAddress, tradeInImagePath, tradeInBrand, tradeInModel , bizUrl,
        bizUserName,bizPassword }) => {
        it(`Guest - Country: ${country}`, () => {
            let orderId;
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
                businessToolPage.loginBiz(bizUserName,bizPassword);
                businessToolPage.clickMenuItem("Order Browser");
                businessToolPage.selectShop("OSG");
                businessToolPage.searchOrderId(orderId);
            })


        })
    })
})