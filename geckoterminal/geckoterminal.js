const axios = require('axios');

const TON_NETWORK = 'ton'; 

function getNewPools(network){
    const url = `https://api.geckoterminal.com/api/v2/networks/${network}/new_pools`;
    axios.get(url, { withCredentials: true })
    .then(response => {




        response.data['data'].forEach(entry => {
            let totalBuys = 0;
            let totalSells = 0;
            let totalBuyers = 0;
            let totalSellers = 0;

            console.log("Pool ID: " + entry.id);
            console.log("Address: " + entry.attributes.address);
            console.log("USD: " + entry.attributes.base_token_price_usd);
            console.log("Creation time: " + entry.attributes.pool_created_at);
            console.log(entry.attributes['transactions'].m5);
            console.log(entry.attributes['transactions'].m15);

            totalBuys += entry.attributes['transactions'].m15.buys;
            totalSells += entry.attributes['transactions'].m15.sells;
            totalBuyers += entry.attributes['transactions'].m15.buyers;
            totalSellers += entry.attributes['transactions'].m15.sellers;

            let differenceBuys = totalBuys - totalSells;

            console.log("Total buys:", totalBuys);
            console.log("Total sells:", totalSells);
            console.log("Total buyers:", totalBuyers);
            console.log("Total sellers:", totalSellers);
            console.log("Difference in buys and sells: -> in favor of buys.", differenceBuys);
        });

        
    })
    .catch(error => {
    console.error('Request failed:', error.message);
    });
}

getNewPools(TON_NETWORK);

