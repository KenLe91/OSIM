import prod from "../fixtures/prod-test-data.json";
class commonPage {
    constructor() {
        this.data = JSON.parse(JSON.stringify(prod));
    }
    load_data(countryCode) {
        const countries = {
            'sg': this.data.sg,
            'th': this.data.th,
            'hk': this.data.hk,
            'my': this.data.my,
            'tw': this.data.tw
        }
        return countries[countryCode]
    }
    getOrderIDFromHref(href) {
        let orderID = href.split('/').pop();
        return orderID.replace('fail?Ref=', '').trim();
    }
}
export default new commonPage();