const axios = require('axios');

module.exports = (app) => {
  app.get('/auth/strava', async (req, res) => {
    console.log('beginning strava auth');
    if (!req.query.code) {
      res.status(400).send('No code provided');
    }
    const { code } = req.query;
    try {
      const athlete = await axios.post(`https://www.strava.com/oauth/token?client_id=${process.env.STRAVA_CLIENT_ID}&client_secret=${process.env.STRAVA_CLIENT_SECRET}&code=${code}`);
      res.status(200).send({ token: athlete.data.access_token });
    } catch (e) {
      res.status(400).send(e);
    }
  });
};
