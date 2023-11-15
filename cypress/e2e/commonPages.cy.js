import commonPage from "../pages/commonPage.js";
const countryCode = ['sg' , 'th' , 'hk' , 'my' , 'tw']
Cypress.config('defaultCommandTimeout', 50000);

describe('Verify user can access: HomePage:', () => {
  countryCode.forEach((country) => {
    it(`Country: ${country} `, () => {
      commonPage.visitPages(country,'')
      cy.url().should('include',country);
    })
  })
})

describe('Verify user can access: Store locator page:', () => {
  countryCode.forEach((country) => {
    it(`Country: ${country} `, () => {
      commonPage.visitPages(country,'/store-locator')
      cy.url().should('include','store-locator');
      cy.get('.store-locator').should('be.visible')
    })
  })
})

describe('Verify user can access: Promotions', () => {
  countryCode.forEach((country) => {
    it(`Country: ${country} `, () => {
      commonPage.visitPages(country,'/promotions')
      cy.url().should('include','promotions');
      const promotion = commonPage.verifyPromoptionPage(country)
      cy.get('.visually-hidden').should('have.text',promotion);
    })
  })
})

describe('Verify user can access: Categories Page', () => {
  countryCode.forEach((country) => {
    it(`Country: ${country} `, () => {
      const url = commonPage.urlCategoryPages(country);
      const categoryName= commonPage.verifyCategoryPage(country);
      commonPage.visitPages(country,url)
      cy.url().should('include',url);
      cy.xpath(`//span[contains(text(),'${categoryName}')]`).should('be.visible');
    })
  })
})

describe('Verify user can access: Product Details Page', () => {
  countryCode.forEach((country) => {
    it(`Country: ${country} `, () => {
      const url = commonPage.urlCategoryPages(country);
      const productName = commonPage.verifyProductDetails(country);
      commonPage.visitPages(country,url)
      cy.url().should('include',url);
      cy.get('.category-product__main__name__link').contains(productName).click({force: true});
      cy.get('.product-detail-header__product-name__text').should('have.text',productName);
    })
  })
})

describe('Verify user can access: Wellness-hub page', () => {
  countryCode.forEach((country) => {
    it(`Country: ${country} `, () => {
      commonPage.visitPages(country,'/Wellness-hub')
      cy.url().should('include','/Wellness-hub');
      const wellness = commonPage.verifyWellnessHubPage(country);
      cy.get('.my-account-header__heading__title').should('have.text',wellness);
    })
  })
})

describe('Verify user can access: Support page', () => {
  countryCode.forEach((country) => {
    it(`Country: ${country} `, () => {
      commonPage.visitPages(country,'/Support')
      cy.url().should('include','/Support');
      const support = commonPage.verifySupportPage(country);
      cy.get('.my-account-header__heading__title').should('have.text',support);
    })
  })
})

describe('Verify user can access: Brand Story page', () => {
  countryCode.forEach((country) => {
    it(`Country: ${country} `, () => {
      commonPage.visitPages(country,'/About/Brand-Story')
      cy.url().should('include','/About/Brand-Story');
      const brandStory = commonPage.verifyBrandStoryPage(country);
      cy.get('.carousel-width-icon__heading h2').should('have.text',brandStory);
    })
  })
})

describe('Verify user can access: Contact Us page', () => {
  countryCode.forEach((country) => {
    it(`Country: ${country} `, () => {
      commonPage.visitPages(country,'/Contact-Us')
      cy.url().should('include','/Contact-Us');
      const contactUs = commonPage.verifyContactUsPage(country);
      cy.get('.experience-title').should('have.text',contactUs);
    })
  })
})

describe('Verify user can access: Compare Product page', () => {
  countryCode.forEach((country) => {
    it(`Country: ${country} `, () => {
      commonPage.visitPages(country,'/compare-products')
      cy.url().should('include','/compare-products');
      const compareProduct = commonPage.verifyCompareProductPage(country);
      cy.get('.experience-title').should('have.text',compareProduct);
      cy.get('.compare-product__container').should('be.visible')
    })
  })
})