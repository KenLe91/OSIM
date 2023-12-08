import commonPage from "../pages/commonPage.js";
const countryCode = ['sg', 'hk', 'my', 'tw', 'th']
Cypress.config('defaultCommandTimeout', 50000);

describe('Verify user can access:', () => {
  countryCode.forEach((countryCode) => {
    commonPage.load_data(countryCode).forEach(({baseURL,country,emailLogin,passwordLogin,verifyPromoptionPage,verifyCategoryPage,urlCategoryPages,verifyProductDetails,
      verifyWellnessHubPage,verifySupportPage,verifyBrandStoryPage,verifyContactUsPage,verifyCompareProductPage} ) => {
          it(`HomePage: ${country}`, () => {
            cy.visit(baseURL);
            cy.url().should('include',country);
            cy.get('div[class="hamburger"]').click();
          })
          it(`Store Locator: ${country}`, () => {
            cy.visit(baseURL+"store-locator");
            cy.url().should('include','store-locator');
            cy.get('.store-locator').should('be.visible');
          })
          it(`Promotions: ${country}`, () => {
            cy.visit(baseURL+"promotions");
            cy.url().should('include','promotions');
            cy.get('.visually-hidden').should('have.text',verifyPromoptionPage);
          })
          it(`Categories Page: ${country}`, () => {
            cy.visit(baseURL+urlCategoryPages);
            cy.url().should('include',urlCategoryPages);
            cy.xpath(`//span[contains(text(),'${verifyCategoryPage}')]`).should('be.visible');
            cy.isPresent('.swiper-slide.category-landing__product.category-product').then(isPresent => {
              expect(isPresent).to.eq(true)
            })
            cy.get('.swiper-slide.category-landing__product.category-product > div > div > .category-product__image > a > img').each(($image) => {
              cy.wrap($image).should('be.visible').and('have.prop', 'naturalWidth').should('be.greaterThan', 0)
          })
          })
          it(`Product Details Page: ${country}`, () => {
            cy.visit(baseURL+urlCategoryPages);
            cy.url().should('include',urlCategoryPages);
            cy.get('.category-product__main__name__link').contains(verifyProductDetails).click({force: true});
            cy.wait(20000);
            cy.get('.product-detail-header__product-name__text').should('have.text',verifyProductDetails);
          })
          it(`Wellness-hub page: ${country}`, () => {
            cy.visit(baseURL+"Wellness-hub");
            cy.url().should('include',"Wellness-hub");
            cy.get('.my-account-header__heading__title').should('have.text',verifyWellnessHubPage);
          })
          it(`Support page: ${country}`, () => {
            cy.visit(baseURL+"Support");
            cy.url().should('include',"Support");
            cy.get('.my-account-header__heading__title').should('have.text',verifySupportPage);
          })
          it(`Brand Story page: ${country}`, () => {
            cy.visit(baseURL+"About/Brand-Story");
            cy.url().should('include',"About/Brand-Story");
            cy.get('.carousel-width-icon__heading h2').should('have.text',verifyBrandStoryPage);
          })
          it(`Contact Us page: ${country}`, () => {
            cy.visit(baseURL+"Contact-Us");
            cy.url().should('include',"Contact-Us");
            cy.get('.experience-title').should('have.text',verifyContactUsPage);
          })
          it(`Compare Product page: ${country}`, () => {
            cy.visit(baseURL+"compare-products");
            cy.url().should('include',"compare-products");
            cy.get('.experience-title').should('have.text',verifyCompareProductPage);
      cy.get('.compare-product__container').should('be.visible')
          })
      })
  })  
})