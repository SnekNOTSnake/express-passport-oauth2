process.on('uncaughtException', (err) => {
	console.error(err);
	process.exit();
});

const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, 'config.env') });

const mongoose = require('mongoose');
const app = require('./app');

mongoose
	.connect(process.env.MONGODB_URI, {
		useCreateIndex: true,
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useFindAndModify: true,
	})
	.then(() => console.log('Database connected'))
	.catch((err) => console.error('Unable to connect database', err));

const PORT = process.env.PORT || 4200;
const server = app.listen(PORT, () => console.log(`Serving on PORT ${PORT}`));

process.on('unhandledRejection', (err) => {
	console.error(err);
	server.close(() => process.exit());
});
