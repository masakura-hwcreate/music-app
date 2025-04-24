import axios from 'axios';

class SpotifyClient {
    static async initialize() {
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);

    const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        params,
        {
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
        );

        let spotify = new SpotifyClient;
        spotify.token = response.data.access_token;
        return spotify;
    }
    test() {
        console.log(this.token);
    }
}

const spotify = await SpotifyClient.initialize();
export default spotify;
