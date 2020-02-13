const fetch = require('cross-fetch');

module.exports = (function() {
    const _parse = function(data) {
        const name = data.name;

        // Get website
        let website = null;
        const contactInfo = data.contactDetails;
        if (contactInfo && contactInfo.length>0) {
            for (let i = 0; i < contactInfo.length; i++) {
                if (contactInfo[i].type === 'Kotisivun www-osoite' || contactInfo[i].type === 'www-adress' || contactInfo[i].type === 'Website address') {
                    website = contactInfo[i].value;
                    break;
                }
            }
        }
        // Get latest address
        const addresses = data.addresses;
        let address = {street: null, postcode: null, city: null, country: null};
        if (addresses && addresses.length>0) {
            const aL = addresses.length;
            address.street = addresses[aL-1].street;
            address.postcode = addresses[aL-1].postcode;
            address.city = addresses[aL-1].city;
            address.country = addresses[aL-1].country;
        }
        // Get first line of business
        let lineOfBusiness = null;
        if (data.businessLines && data.businessLines.length>0) {
            lineOfBusiness = data.businessLines[0].name;
        }
        return {name: name, website: website, address: address, lineOfBusiness: lineOfBusiness};
    };

    const getById = async (businessId) => {
        // fetch data from the API
        const res = await fetch('https://avoindata.prh.fi/bis/v1/' + businessId);
        if (res.ok && res.status >= 200 && res.status <= 299) {
            const data = await res.json();
            if (data && data.results && data.results[0]) {
                // Parse data to business info
                return _parse(data.results[0]);
            } else {
                console.warn('Warn:', 'BusinessInfo.getById', businessId);
                console.warn('Didn\'t get any results', res);
            }
        } else {
            console.error('Error:', 'BusinessInfo.getById', businessId);
            console.error('Response', res.statusText);
        }
    };
    return {
        getById
    }
})();