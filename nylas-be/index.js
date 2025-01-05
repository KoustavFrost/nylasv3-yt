require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { default: Nylas } = require('nylas');
const { exchangeCodeForToken, appendToJsonFile } = require('./helper');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.get('/auth/callback', async (req, res) => {
  const queryParams = req.query;
  console.log('params :: ', queryParams);
  const { code, state } = queryParams;

  const nylasApp = new Nylas({
    apiKey: process.env.API_KEY,
    apiUri: process.env.APP_URL
  });

  const authReq = {
    clientId: process.env.CLIENT_ID,
    redirectUri: process.env.REDIRECT_URI,
    code,
    accessType: 'offline',
    grantType: 'authorization_code'
  };

  const response = await nylasApp.auth.exchangeCodeForToken(authReq);
  console.log('response : ', response);

  const userObj = {
    username: state,
    nylasAuth: response,
    createdAt: new Date().toISOString()
  };

  await appendToJsonFile(userObj);

  res.send('OK');
});

app.get('/', (req, res) => {
  res.send('Nylas Backend');
});

app.listen(PORT, () => {
  console.log(`PORT RUNNING AT: ${PORT}`);
});
