## Live Demo: https://stravadash.herokuapp.com/

## Strava Dash

A fitness dashboard built on the [Strava v3](https://developers.strava.com/docs/reference/) API and the MERN Stack.

## Notable Features

#### [Server-side Authentication](https://github.com/connorjohnlind/strava-dashboard/blob/master/server/routes/authRoutes.js)

The Strava accessToken is exchanged on the back-end Express server, returned to the client, and stored in localStorage for future requests in order to keep the `STRAVA_CLIENT_SECRET` secure.

``` javascript
// authRoutes.js

const axios = require('axios');

module.exports = (app) => {
  app.get('/auth/strava', async (req, res) => {
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

```

#### [Async/Await](https://github.com/connorjohnlind/strava-dashboard/blob/master/client/store/actions/auth.js)
Here I'm avoiding callback hell for several asynchronous requests to the Strava API in Redux.

``` javascript
// client/store/actions/auth.js

// handles the oAuth token exchange on the backend
export const authInit = codeQuery => (async (dispatch) => {
  try {
    const auth = await axios.get(`/auth/strava?code=${codeQuery}`);
    const athlete = await axios.get(`https://www.strava.com/api/v3/athlete?access_token=${auth.data.token}`);
    const totals = await axios.get(`https://www.strava.com/api/v3/athletes/${athlete.data.id}/stats?access_token=${auth.data.token}`);
    const activities = await axios.get(`https://www.strava.com/api/v3/athlete/activities?access_token=${auth.data.token}&per_page=200`);
    dispatch(authSuccess(auth.data.token, athlete.data, totals.data, activities.data));
    localStorage.setItem('accessToken', auth.data.token);
  } catch (error) {
    dispatch(authFail(error.response));
  }
  window.history.replaceState({}, document.title, '/');
});

// for revists, when the token is stored in localStorage
export const authRenew = token => (async (dispatch) => {
  try {
    const athlete = await axios.get(`https://www.strava.com/api/v3/athlete?access_token=${token}`);
    const totals = await axios.get(`https://www.strava.com/api/v3/athletes/${athlete.data.id}/stats?access_token=${token}`);
    const activities = await axios.get(`https://www.strava.com/api/v3/athlete/activities?access_token=${token}&per_page=200`);
    dispatch(authSuccess(token, athlete.data, totals.data, activities.data));
  } catch (error) {
    dispatch(authFail(error.response));
  }
});

```

#### [Pie Charts and Bar Graphs](https://github.com/connorjohnlind/strava-dashboard/tree/master/client/components/Dashboard/Totals/Charts)
An animated and interactive analytics dashboard, made from a combination of Redux and Local UI State Components

```javascript

// Note: no need to read every detail, just scan the comments at right :)

import { sports } from '../../Filters/filterTypes';    // config file for iterations

class PieChart extends Component {
  state = {                                            // local UI state to handle hover states
    value: null,
    units: null,
  }

  // build an object with key=sport and value=activity_count from Redux
  getCounts() {
    const { range, auth, demo } = this.props;
    const mode = !demo.demoLoading ? demo : auth;  // check if in demo mode
    const activeCounts = {};
    sports.forEach((sport) => {
      const { key } = sport;
      if (this.props.filters[key]) {
        const { count } = mode.totals[`${range}_${key}_totals`];    // template strings, due to the Stava API response
        activeCounts[key] = count;                                  // (read more in "Notes on Development")
      }
    });
    return activeCounts;
  }

  // callback functions to respond to circle hover states
  handleMouseIn = (value, units) => {
    this.setState({
      value,
      units: `${units.substring(0, 1).toUpperCase()}${units.substring(1)}s`,   // capitalize the label
    });
  }
  handleMouseOut = () => {
    this.setState({ value: null, units: null });
  }

  // helper function to get the total activity count
  totalCount() {
    const activeCounts = this.getCounts();
    if (Object.keys(activeCounts).length > 0) {
      return Object.values(activeCounts).reduce((a, b) => a + b);
    }
    return null;
  }

  renderPiechart() {
    return (
      <svg viewBox="0 0 42 42" className={classes.piechart}>            // took the svg approach for piecharts
        <Circles
          data={this.getCounts()}
          mouseIn={this.handleMouseIn}
          mouseOut={this.handleMouseOut}
          cx={21}
          cy={21}
          r={15.91549430918954}    // circumference = 100 = 2*PI*r
        />
        <g className={classes.chartText}>
          <text x="50%" y="50%" className={classes.chartNumber}>
            {this.state.value ? this.state.value : this.totalCount()}   // show the hover value or the total count
          </text>
          <text x="50%" y="50%" className={classes.chartLabel}>
            {this.state.units ? this.state.units : 'Activities'}
          </text>
        </g>
      </svg>
    );
  }
  render() {
    return (
      <div className={classes.content}>
        {this.totalCount() > 0 ? this.renderPiechart() : null}           // disable if all sports are unclicked
      </div>
    );
  }
}

PieChart.propTypes = {
  auth: PropTypes.shape({}).isRequired,      // Redux source of truth
  demo: PropTypes.shape({}).isRequired,      // compatibility with demo mode, note on this at bottom of Readme
  filters: PropTypes.shape({}).isRequired,   // filters from the menu of buttons, stored in Redux
  range: PropTypes.string.isRequired,        // passed down from Dashboard parent component
};

export default connect(
  ({ auth, demo, filters }) => ({ auth, demo, filters }),
  actions,
)(PieChart);

```

#### [/demo data](https://github.com/connorjohnlind/strava-dashboard/blob/master/server/scripts/demo.js)
A script is run on the backend to provide dummy data for visitors without a Strava account.

``` javascript
require('../config/config');

const url = process.env.MONGODB_URI; // for dev or prod
const dbName = 'stravadash-demo';

const dummy = require('./demo.data');

const insertDocument = (db, callback) => {
  const collection = db.collection('demoData');
  collection.drop(() => {
    console.log('Wiped collection');
  });
  collection.insert({ data: dummy }, (err, result) => {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    assert.equal(1, result.ops.length);
    console.log('Inserted 1 document into the collection');
    callback(result);
  });
};

MongoClient.connect(url, (err, client) => {
// ...
});

```

#### [Custom Webpack Config](https://github.com/connorjohnlind/strava-dashboard/blob/master/webpack.config.prod.js)
Full-stack Webpack 4 configurations for development and production

## Notes on Development

#### Front-end

* The data structure of the [getStats](https://developers.strava.com/docs/reference/#api-Athletes-getStats) API response (i.e. `"ytd_ride_totals"`, `"all_ride_totals"`, `"recent_ride_totals"`) made a huge impact on the way data was passed around the app. Early on in development, I decided to leave the Strava API data 'as is' in Redux, and build more convenient data objects in containers (i.e. the `getChartMaximums()` method in `Totals`). If the getStats data would have been needed in other components, I might have decided to parse the data into a more desirable format in the action creator, building objects based on range (such as `recent.ride.count`) instead of dealing with template strings in `recent_ride_totals.count`).

* Utilizing a [config file](https://github.com/connorjohnlind/strava-dashboard/blob/master/client/components/Dashboard/Totals/Filters/filterTypes.js) for the sports, ranges, and their labels made for a lot more DRY iteration throughout the app. This might have been overkill, considering it's very unlikely that running, biking, swimming will ever change in the context of a triathlete-focused app. However I found it to be useful exercise to allow all of my components to adjust to this configuration (i.e. renaming 'Month' to '4 weeks' as a filter). There are just a few instances where I opted to hard code based on sport, such as the color coding of run/ride/swim in SCSS files.

* The app started with a mobile-first design, but desktop quickly became the focus of development.

#### Back-end

* A portfolio project targeted only towards power users of a specific app isn't a good demonstration for the general public. Therefore, I decided to save my personal Strava data to a MongoDB instance and serve that publicly from [/demo](https://stravadash.herokuapp.com/demo). There were a few other approaches that I considered, such calling the Strava API with my authentication credentials on Node, and serving that to /demo directly, yet if any accessTokens were revoked or expired the demo app would break. Therefore serving some static assets from Mongo seemed the best approach. You can view the script file [here](https://github.com/connorjohnlind/strava-dashboard/blob/master/server/scripts/demo.js), where I use Node's native Mongo driver to parse a local JS object (copy and pasted from my 'auth' reducer in redux dev tools). The data, properly formatted for the client side, is then added to a 'demo' reducer in the app upon GET /demo.

## Areas for Improvement

#### Front-end

* The `Demo` component hierarchy is a bit inconsistent in the way that Strava data is passed to components. For the `Calendar`, the demo data is passed in as a prop (`activities`), and the `Calendar` handles all component renders accordingly. The `Totals` component, however, is connected to Redux at nearly every step in the hierarchy (`Totals`, `PieChart`, `Graph`). The reason this decision was made was because of the difficulty with utilizing the string-based data structure of getStats (mentioned above), which made passing in data as props a bit bloated. In my opinion, an optimal refactor would include rewriting the getStats response to a more convenient data structure in Redux, and passing along the key pieces of data (maximums, distance, and counts by sport and range) in as props throughout the `Totals` component hierarchy.
