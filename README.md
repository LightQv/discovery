## Introduction

To learn how OAuth 2.0 works and how to implement such a feature in my future projects, I created a fully Responsive Web App using _Spotify Web API_.

## Concept

You can Login with your Spotify's infos and listen directly in the website to your playlists or any song. You can also access to your _Top Recent Songs_, _Top Artists_ and discover _new_ songs based on _random music gender_.
The website also includes a Dark Theme with _Light_, _Dark_ and _System_ option.
Since Spotify provides more data for Premium users, I'll advice to log with a Premium Spotify's account to enjoy the full experience.

## Setup

- Clone this repo
- If you are using `yarn` or `pnpm`, adapt the `config/cli` in `package.json`
- Run command `npm install`
- Run command `npm run migrate`
- _NB: To launch the backend server, you'll need an environment file with database credentials. You'll find a template one in `backend/.env.sample`_
- You also need to subscribe on Spotify Developer's plan to get an API Key.
  
## Configuration

Create `.env` files in /frontend and /backend following `.env.sample` examples.

## Use

- Run Frontend and Backend server with one command : `npm run dev`
- Express server will be accessible at the address set in the /frontend's .env
- React client will be accessible at the address set in the /backend's .env

- Create an account and then Log in to try Instagif.

### Available Commands

- `migrate` : Run the database migration script
- `dev` : Starts both servers (frontend + backend) in one terminal
- `dev-front` : Starts the React frontend server
- `dev-back` : Starts the Express backend server
- `lint` : Runs validation tools, and refuses unclean code (will be executed on every _commit_)
- `fix` : Fixes linter errors (run it if `lint` growls on your code !)

### Tools

- _Concurrently_ : Allows for several commands to run concurrently in the same CLI
- _Husky_ : Allows to execute specific commands that trigger on _git_ events
- _Vite_ : Alternative to _Create-React-App_, packaging less tools for a more fluid experience
- _ESLint_ : "Quality of code" tool, ensures chosen rules will be enforced
- _Prettier_ : "Quality of code" tool as well, focuses on the styleguide
- _ Airbnb Standard_ : One of the most known "standards", even though it's not officially linked to ES/JS
- _Nodemon_ : Allows to restart the server everytime a .js file is udated

### Deployement

Work in progress. Here's some screenshot while it's done.

_Landing Page with Last Spotify's Releases_

![Alt text](https://i.imgur.com/hyETtKo.png "Landing Page")


_Library which gives access to User's Playlists, Recent Tracks and Search Page_

![Alt text](https://i.imgur.com/hqW2dot.png "Library")


_Search Page with Random suggestion while no search have been typed_

![Alt text](https://i.imgur.com/Z08pXfR.png "Search")


_My Profile with Top Track & Artists_
![Alt text](https://i.imgur.com/Z08pXfR.png "Profile")
