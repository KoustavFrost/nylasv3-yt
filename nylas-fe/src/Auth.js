import React from 'react';

const style = {
  textAlign: 'center',
  margin: '10px'
};

const Auth = () => {
  const handleClick = () => {
    const clientId = process.env.REACT_APP_NYLAS_CLIENT_ID;
    const nylasURL = process.env.REACT_APP_NYLAS_APP_URL;
    const redirectUri = process.env.REACT_APP_NYLAS_REDIRECT_URI;
    const state = `somedatahere`;

    const authURL = `${nylasURL}v3/connect/auth?client_id=${clientId}&redirect_uri=${redirectUri}&access_type=offline&response_type=code&provider=google&state=${state}`;

    window.location = authURL;
  };
  return (
    <div style={style}>
      <button type='button' onClick={handleClick}>
        Auth User
      </button>
    </div>
  );
};

export default Auth;
