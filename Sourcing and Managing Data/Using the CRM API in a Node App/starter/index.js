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

app.listen(3000, () => console.log('Listening on http://localhost:3000'));
