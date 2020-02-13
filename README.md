# business-info
-------------------
Simple Node.js module for fetching basic company information. Add it to your Node project's node_modules and install cross-fetch (e.g. npm i cross-fetch).

Call getById(businessID) with business id and you will receive:
* name
* website
* latest address
* line of business

Possible errors and issues are logged in to console. The module uses open API by The Finnish Patent and Registration Office to receive the data (https://avoindata.prh.fi/ytj_en.html​). 

Example:
const businessInfo = require('business-info');
async function makkara() {
    console.log(await businessInfo.getById('0112038-9'));
}
makkara();

Output:
{
  name: 'Nokia Oyj',
  website: 'www.nokia.com',
  address: {
    street: 'Karakaari 7',
    postcode: undefined,
    city: 'ESPOO',
    country: null
  },
  lineOfBusiness: 'Activities of head offices'
}
