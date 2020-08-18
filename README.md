# Express with Passport Google OAuth2

This work is a demonstration of using Google OAuth2 with Passport.js to enable users to log in with and only with their Google accounts. In the future, this work could be added support for other authentication methods such as using Facebook or GitHub, but for now it only supports Google.

## Features

- <img align="left" alt="NodeJS" width="22px" src="https://simpleicons.org/icons/node-dot-js.svg" /> NodeJS
- <img align="left" alt="ExpressJS" width="22px" src="https://simpleicons.org/icons/node-dot-js.svg" /> ExpressJS
- <img align="left" alt="OAuth2" width="22px" src="https://simpleicons.org/icons/google.svg" /> OAuth2
- <img align="left" alt="PassportJS" width="22px" src="https://simpleicons.org/icons/javascript.svg" /> PassportJS

## Installation

1. Clone this repository and then install its dependencies

	```bash
	git clone https://github.com/SnekNOTSnake/express-passport-oauth2
	cd express-with-passport-google-oauth
	yarn
	```

2. Configure the `config.env` file

	```env
	PORT=4200
	MONGODB_URI="<your_mongodb>"
	COOKIE_KEY="<tahu-kotak-tidak-bulat-apalagi-segitiga>"

	OAUTH2_CLIENT_ID="<your_oauth2_client_id>"
	OAUTH2_CLIENT_SECRET="<your_oauth2_client_secret>"
	```

## Running

First of all, make sure your MongoDB is running.

```bash
yarn run start
```
