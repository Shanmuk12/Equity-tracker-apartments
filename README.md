# equity-apartments-tracker

Track the prices of Equity Residential apartments as they fluctuate day by day.

Designed to run on Google App Engine standard environment. Uses Google Cloud Datastore for data storage.

# Installation

__Requirements:__
- Google Cloud SDK
- Node.js/npm

1. Clone the repo.
2. `cd` into the `frontend` directory.
3. Run `npm install`
4. Run `npm run build`
5. `cd` back into the root directory.
6. Run `gcloud app deploy`

Your instance should now be running.

## Customization
To modify the apartment buildings that are tracked, update `siteURLs` in `hello.go` with the name and URL of the apartment building you're trying to track.