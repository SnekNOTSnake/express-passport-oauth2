const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cookieSession = require('cookie-session');
const UsersRoutes = require('./Routes/Users-routes');
const ViewRoutes = require('./Routes/View-routes');
const globalErrorHandler = require('./controllers/Error-controller');
const Users = require('./models/Users-model');

const app = express();

// Instruct passport to use cookies to handle authentication
app.use(
	cookieSession({
		// One week
		maxAge: 1000 * 60 * 60 * 24 * 7,
		keys: [process.env.COOKIE_KEY],
	})
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.OAUTH2_CLIENT_ID,
			clientSecret: process.env.OAUTH2_CLIENT_SECRET,
			callbackURL: '/auth/google/redirect',
		},
		// Find or create the user if not yet registered
		async (accessToken, refreshToken, profile, done) => {
			const user = await Users.findOne({ googleId: profile.id });
			if (user) return done(null, user);
			const newUser = new Users({
				googleId: profile.id,
				email: profile.emails[0].value,
				name: profile.name.givenName,
			});
			await newUser.save();
			done(null, newUser);
		}
	)
);

// Serialize user: Make passport generates some identifying token stuff inside a cookie and send it to user's browser. user in this code refers to the user model instance we created in our database (user.id by MongoDB) instead of Google profile ID. Imagine a scenario when the user can log in your app with Facebook account apart from Google.
passport.serializeUser((user, done) => {
	done(null, user.id);
});

// Deserialize user: Later, the user needs some resources from our app on the browser, say, asking for some posts. The cookie will be automatically added to the request sent to the server. Server will then take the identifying token from cookie, pass into `deserializeUser` function to turn it into a user.
// Passport then firgures out the user has already been authenticated and directs the server to send the requested posts to the user's browser.
passport.deserializeUser(async (id, done) => {
	const user = await Users.findById(id);
	done(null, user);
});

// Prompt the sign in with google
// 'profile' and 'email' is a basic scopes
// enabling us to view your basic profile and view your email address
app.get(
	'/auth/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
);
// Redirect target handling
app.get(
	'/auth/google/redirect',
	passport.authenticate('google'),
	(req, res) => {
		// User model instance we got from deserializeUser is added to req.user
		return res.redirect('/');
	}
);
app.get('/auth/logout', (req, res) => {
	// Passportjs exposes req.logout() that can be used to terminate login session
	req.logout();
	res.send('Logged out');
});

app.use('/', ViewRoutes);
app.use('/api/v1/users', UsersRoutes);
app.all('*', (req, res, next) => res.status(404).send('Not found'));
app.use(globalErrorHandler);

module.exports = app;
