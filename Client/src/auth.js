// src/auth.js inside client folder

let clientId;
let clientSecret;

// Fetch the configuration from the JSON file
const loadConfig = async () => {
  const response = await fetch("/path-to-your-env-file/env.json");
  const config = await response.json();
  clientId = config.SPOTIFY_CLIENT_ID;
  clientSecret = config.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error(
      "Spotify Client ID and Secret are not defined. Please check your env.json file."
    );
  }
};

const getToken = async () => {
  await loadConfig(); // Ensure the config is loaded before proceeding
  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
  });

  const data = await result.json();
  return data.access_token;
};

export default {
  getToken,
};
