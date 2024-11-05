let clientId = '63df0d7b18364e369c2b704ebde82427'; 
let redirectUri = 'http://localhost:5173/'; 
const scopes = [ 'streaming','user-modify-playback-state'];

const getAuthUrl = () => {
  const authEndpoint = 'https://accounts.spotify.com/authorize';
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    scope: scopes.join(' '),
    redirect_uri: redirectUri,
  });

  return `${authEndpoint}?${params.toString()}`;
};

const getToken = async (code) => {
  const result = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: '58d8dea6569448ccb3bfda430fe9d99d',
    }),
  });

  const data = await result.json();
  if (data.access_token) {
    localStorage.setItem('spotify_access_token', data.access_token);
  }
  return data.access_token;
};

export default {
  getAuthUrl,
  getToken,
};
