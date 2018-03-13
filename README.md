## Strava Dash

A fitness dashboard built on the [Strava v3](https://developers.strava.com/docs/reference/) API and the MERN Stack.

## Notable Features

* [Server-side Authentication](https://github.com/connorjohnlind/strava-dashboard/blob/master/routes/authRoutes.js) - the Strava accessToken is exchanged on the back-end, returned to the client, and stored in localStorage for future requests, in order to keep the STRAVA_CLIENT_SECRET secure
* [Async/Await](https://github.com/connorjohnlind/strava-dashboard/blob/master/client/src/store/actions/auth.js) - avoiding callback hell for several asynchronous requests to the Strava API
* [Pie Charts and Bar Graphs](https://github.com/connorjohnlind/strava-dashboard/tree/master/client/src/components/Dashboard/Totals) - an animated and interactive analytics dashboard, made from a combination of Redux and Local UI State Components
* [API for /demo](https://github.com/connorjohnlind/strava-dashboard/blob/master/scripts/demo.js) - a script is run on the backend to provide dummy data for visitors without a Strava account
* [Custom Webpack Config](https://github.com/connorjohnlind/strava-dashboard/tree/master/client) - full-stack Webpack 3 configurations for development and production

## Notes on Development

#### Front-end

* The string-based data structure of the [getStats](https://developers.strava.com/docs/reference/#api-Athletes-getStats) API endpoint made a huge impact on the way data was passed around the app. Early on in development, I decided to leave the Strava API data 'as is' in Redux, and build more convenient data objects in Containers (i.e. the getMaximums() method in Totals). If the getStats data would have been needed in other Components, I might have decided to parse the data into a more desirable format in the action creator, building objects based on range (such as recent.ride.totals.count) instead of dealing with template strings in recent_ride_totals.count).

* Utilizing a [config file](https://github.com/connorjohnlind/strava-dashboard/blob/master/client/src/components/Dashboard/Totals/Filters/filterTypes.js) for the sports, ranges, and their labels made for a lot more DRY iteration throughout the app. This might have been overkill, considering it's very unlikely that running, biking, swimming will ever change in the context of a triathlete-focused app. However I found it to be useful exercise to allow all of my components to adjust to this configuration (i.e. renaming 'Month' to '4 weeks' as a filter). There are just a few instances where I opted to hard code based on sport, such as the color coding of run/ride/swim in SCSS files.

* The app started with a mobile-first design, but desktop quickly became the focus of development.

#### Back-end

* A portfolio project targeted only towards power users of a specific app isn't a good demonstration for the general public. Therefore, I decided to save my personal Strava data to a MongoDB instance and serve that publicly from [/demo](https://stravadash.herokuapp.com/demo). There were a few other approaches that I considered, such calling the Strava API with my authentication credentials on Node, and serving that to /demo directly, yet if any accessTokens were revoked or expired the demo app would break. Therefore serving some static assets from Mongo seemed the best approach. You can view the script file [here](https://github.com/connorjohnlind/strava-dashboard/blob/master/scripts/demo.js), where I use Node's native Mongo driver to parse a local JS object (copy and pasted from my 'auth' reducer in redux dev tools). The data, properly formatted for the client side, is then added to a 'demo' reducer in the app upon GET /demo.
