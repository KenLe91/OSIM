class commonPage{
    visitPages(countryCode,path){
        if(countryCode == 'sg'){
            cy.visit('https://'+countryCode+'.osim.com'+path+'');
        }
        else if(countryCode == 'th'){
            cy.visit('https://www.osim.co.'+countryCode+path+'');
        }
        else{
            cy.visit('https://www.osim.com.'+countryCode+path+'');
        }
    }
    verifyPromoptionPage(countryCode){
        switch(countryCode){
            case 'sg':
                return 'OUR PROMOTIONS'
            case 'th':
                return 'OUR PROMOTIONS'
            case 'hk':
                return '推廣優惠'
            case 'my':
                return 'OSIM Promotions'
            default:
                return '最新活動'  
        }
    }
    urlCategoryPages(countryCode){
        switch(countryCode){
            case 'sg':
                return '/product/category/Beauty-Series'
            case 'th':
                return '/product/category/Travel-Comfort'
            case 'hk':
                return '/product/category/Beauty-Devices'
            case 'my':
                return '/product/category/Beauty-Series'
            default:
                return '/product/category/Eyes-Head-and-Hands-Massagers'  
        }
    }
    verifyProductDetails(countryCode){
        switch(countryCode){
            case 'sg':
                return 'uGlow Brush Ionic Scalp Massager'
            case 'th':
                return 'uMask Eye Massager'
            case 'hk':
                return '負離子光療梳'
            case 'my':
                return 'uGlow Brush Ionic Scalp Massager'
            default:
                return '護眼樂Air'  
        }
    }
    verifyCategoryPage(countryCode){
        switch(countryCode){
            case 'sg':
                return 'Product Catalogue'
            case 'th':
                return 'Product Catalogue'
            case 'hk':
                return '產品目錄'
            case 'my':
                return 'Product Catalogue'
            default:
                return '比較產品'  
        }
    }
    verifyWellnessHubPage(countryCode){
        switch(countryCode){
            case 'sg':
                return 'WELLNESS HUB'
            case 'th':
                return 'WELLNESS HUB'
            case 'hk':
                return '健康資訊平台'
            case 'my':
                return 'WELLNESS HUB'
            default:
                return '健康生活學'  
        }
    }
    verifySupportPage(countryCode){
        switch(countryCode){
            case 'sg':
                return 'SUPPORT'
            case 'th':
                return 'SUPPORT'
            case 'hk':
                return '常見問題'
            case 'my':
                return 'SUPPORT'
            default:
                return '售後服務'  
        }
    }
    verifyBrandStoryPage(countryCode){
        switch(countryCode){
            case 'sg':
                return 'History and Milestone'
            case 'th':
                return 'History and Milestone'
            case 'hk':
                return '歷史與經歷'
            case 'my':
                return 'History and Milestone'
            default:
                return '歷史與經歷'  
        }
    }
    verifyContactUsPage(countryCode){
        switch(countryCode){
            case 'sg':
                return 'Contact Us'
            case 'th':
                return 'Contact Us'
            case 'hk':
                return '聯絡我們'
            case 'my':
                return 'Contact Us'
            default:
                return '聯絡我們'  
        }
    }
    verifyCompareProductPage(countryCode){
        switch(countryCode){
            case 'sg':
                return 'Compare Product'
            case 'th':
                return 'Compare Product'
            case 'hk':
                return '產品比較'
            case 'my':
                return 'Compare Product'
            default:
                return '比較產品'  
        }
    }
}
export default new commonPage();