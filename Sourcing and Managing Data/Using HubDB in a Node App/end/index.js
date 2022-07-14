const hubspot = require('@hubspot/api-client');
const hubspotClient = new hubspot.Client({ accessToken: YOUR_ACCESS_TOKEN });

const express = require('express');
const res = require('express/lib/response');

const app = express();

const HubDbTableV3Request = { name: "my_favorite_ice_cream", label: "My Favorite Ice Cream", columns: [{"name":"first_name","label":"First Name","id":"1","type":"TEXT"}]};

const buildTable = async () => {
    try {
        const apiResponse = hubspotClient.cms.hubdb.tablesApi.createTable(HubDbTableV3Request);
        console.log("Success!", JSON.stringify(apiResponse.body, null, 2));
      } catch (e) {
        e.message === 'HTTP request failed'
          ? console.error(JSON.stringify(e.response, null, 2))
          : console.error(e)
      }
}

// buildTable();

app.get('/', async (req, res) => {
    const tableIdOrName = "my_favorite_ice_cream";
    try {
        const apiResponse = await hubspotClient.cms.hubdb.rowsApi.getTableRows(tableIdOrName);
        const data = apiResponse.results;
        res.json(data);
    } 
    catch (e) {
        e.message === 'HTTP request failed'
        ? console.error(JSON.stringify(e.response, null, 2))
        : console.error(e)
    }
});

app.listen(3000, () => console.log('Listening on http://localhost:3000'));