const fs = require('fs/promises');
const path = require('path');

const EXCHANGE_CODE_FOR_TOKEN_URL = 'v3/connect/token';
const FILE_PATH = './user.json';

const exchangeCodeForToken = async (
  code,
  grantType = 'authorization_code',
  accessType = 'offline'
) => {
  const origin = process.env.ORIGIN;
  const codeExchangeRequestBody = {
    code,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.API_KEY,
    recirect_uri: 'http://localhost:3001/auth/callback',
    grant_type: grantType,
    access_type: accessType
  };
  console.log('codeExchangeRequestBody: ', codeExchangeRequestBody);

  const url = `${process.env.API_URL}${EXCHANGE_CODE_FOR_TOKEN_URL}`;
  console.log('URL: ', url);

  const config = {
    body: JSON.stringify(codeExchangeRequestBody),
    headers: {
      'Content-Type': 'application/json',
      ...(origin && { Origin: origin })
    }
  };
  console.log('config: ', config);

  const method = 'POST';

  const response = await fetch(url, {
    ...config,
    method
  });

  const res = await response.json();
  console.log(res);
  if (res.error_code >= 400) {
    throw new Error(res?.error_description);
  }

  return res;
};

const appendToJsonFile = async (object) => {
  try {
    const fileContent = await fs.readFile(FILE_PATH, 'utf-8');
    const fileData = JSON.parse(fileContent);

    fileData.push(object);

    // Write updated content to file
    await fs.writeFile(FILE_PATH, JSON.stringify(fileData, null, 2), 'utf-8');
    console.log('User-Nylas Auth details added');

    return true;
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error; // File not found error
    } else {
      console.error('Error updating JSON file: ', error);
    }
  }
};

module.exports = { exchangeCodeForToken, appendToJsonFile };
