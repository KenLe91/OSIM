class productPage{
    gotoProductDetailPageviaCategory(baseURL,urlCategory,nameProduct){
        cy.visit(baseURL+urlCategory);
        cy.url().should('include',urlCategory);
        cy.get('.category-product__main__name__link').contains(nameProduct).click({force: true});
        cy.get('.product-detail-header__product-name__text').should('be.visible');
        cy.get('.product-detail-header__product-name__text').should('have.text',nameProduct);
    }
    gotoProductDetailPageviaArticle(baseURL,urlArticle,nameProduct){
        cy.visit(baseURL+urlArticle);
        cy.url().should('include',urlArticle);
        cy.get('.article__content__title-link').contains(nameProduct).click({force: true});
        cy.get('.product-detail-header__product-name__text').should('be.visible');
        cy.get('.product-detail-header__product-name__text').should('have.text',nameProduct);
    }
    clickOnBuyNow(){
        cy.wait(5000);
        cy.get('.product-detail-header__btn').should('be.not.disabled').click();
    }
    addToCart(country){
        cy.wait(5000);
        //cy.get('.add-to-cart__body__success-text').should('be.visible');
        cy.get('.buying-option-header__btn > span').should('be.not.disabled').click();
        if(country == 'hk'){
            cy.get('.add-to-cart__header__contents__button').should('be.not.disabled');
            cy.get('.add-to-cart__header__contents__button').click({ force: true })
        }
    }
    chooseWarranty(position){
        //click on position warranty want to select
        cy.get('.warranty-buying-list > div > div > div > span').should('be.visible');
        cy.get('.warranty-buying-list > div > div > div > span').eq(position).click();
        cy.get('.warranty-buying.buying-option__group-info__line-bottom').find('.btn-change.active').should('be.visible');
    }
    addTradeIn(filepath,brand,productName,model){
        //click on trade in button
        cy.get('.btn.btn-outline-CTA2').should('be.visible');
        cy.get('.btn.btn-outline-CTA2').click();
        //click on selecte trade-in product
        cy.get('.osim-radio-label').should('be.visible');
        cy.get('.osim-radio-label').click();
        cy.get('#tradeInProductImage').attachFile(filepath, { subjectType: 'input' })
        //input brand
        cy.get('#brand').type(brand);
        //input product name
        cy.get('#productName').type(productName);
        //input model
        cy.get('#model').type(model);
        //click on osim agreement
        cy.get('.osim-checkbox-label').click();
        //click on Add Trade In
        cy.wait(1000);
        cy.get(`form[action='#'] .btn.btn-primary`).click();
        cy.get('.tradein-buying.buying-option__group-info__line-bottom').find('.btn-change.active').should('be.visible');
    }
    chooseColor(position){
        cy.get('.variant-buying-list').should('be.visible');
        cy.get('.variant-buying-list').find('.row > div').eq(position).click();
        cy.get('.variant-buying.buying-option__group-info__line-bottom').find('.btn-change.active').should('be.visible');
    }
    clickCheckOutButton(){
        cy.get('.cart-summary__button__inner.flex-between > button').should('be.visible');
        cy.get('.cart-summary__button__inner.flex-between > button').should('be.visible').click();
    }
       
}
export default new productPage();