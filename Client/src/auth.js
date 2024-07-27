//this page giving the option to connect to your spotify account through this website
//this website does not currently use this but keeping it as an option


//auth.js accessing the spotify db
// spotify client id 
const CLIENT_ID = '63df0d7b18364e369c2b704ebde82427'; 

//keeping for future options
const REDIRECT_URI = 'http://localhost:5173/'; // the url after excessing the db spotify will redirect to (incase of connecting to spotify account)

// Function to generate the Spotify authorization URL
export function getAuthUrl() {
  // Scopes specify the permissions that the application is requesting
  const scopes = [
    'user-read-private',     // Permission to read user's private information
    'user-read-email',       // Permission to read user's email address
    'playlist-read-private', // Permission to read user's private playlists
    'user-library-read',     // Permission to read user's library
  ];

  // Construct and return the authorization URL with the necessary parameters
  return (
    `https://accounts.spotify.com/authorize?response_type=token&client_id=${CLIENT_ID}&scope=${encodeURIComponent(scopes.join(' '))}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`
  );
}

// Function to extract the access token from the URL hash
export function getAccessToken() {
  // Get the URL hash (part after #) and split it into key-value pairs
  const hash = window.location.hash.substring(1).split('&').reduce((acc, cur) => {
    const [key, value] = cur.split('='); // Split each pair into key and value
    acc[key] = value; // Add the key-value pair to the accumulator object
    return acc; // Return the accumulator for the next iteration
  }, {});

  return hash.access_token; // Return the access token from the hash
}
