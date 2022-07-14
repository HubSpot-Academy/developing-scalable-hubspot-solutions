const hubspot = require('@hubspot/api-client');
const hubspotClient = new hubspot.Client({ accessToken: YOUR_ACCESS_TOKEN });

const express = require('express');
const res = require('express/lib/response');

const app = express();

app.get('/', (req, res) => {
    const addHTML = `
        <h1>Links</h1>
        <ul>
            <li><a href="/companies">Companies</a></li>
            <li><a href="/contacts">Contacts</a></li>
        </ul>
    `;
    res.send(addHTML);
});

app.get('/companies', async (req, res) => {
    const limit = 10;
    const after = undefined;
    const properties = undefined;
    const propertiesWithHistory = undefined;
    const associations = [
        "CONTACT"
    ];
    const archived = false;
    try {
        const apiResponse =  hubspotClient.crm.companies.basicApi.getPage(limit, after, properties, propertiesWithHistory, associations, archived);
        const data = apiResponse.results;
        res.json(data);
    } catch (e) {
        e.message === 'HTTP request failed'
        ? console.error(JSON.stringify(e.response, null, 2))
        : console.error(e)
    }

});

app.get('/contacts', async (req, res) => {
    const limit = 10;
    const after = undefined;
    const properties = [
        "firstname",
        "lastname",
        "email",
        "company"
    ];
    const propertiesWithHistory = undefined;
    const associations = undefined;
    const archived = false;
    try {
        const apiResponse =  hubspotClient.crm.contacts.basicApi.getPage(limit, after, properties, propertiesWithHistory, associations, archived);
        const data = apiResponse.results;
        res.json(data);
    } catch (e) {
        e.message === 'HTTP request failed'
        ? console.error(JSON.stringify(e.response, null, 2))
        : console.error(e)
    }
});

app.listen(3000, () => console.log('Listening on http://localhost:3000'));