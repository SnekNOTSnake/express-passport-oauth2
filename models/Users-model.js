const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is required'],
		trim: true,
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		trim: true,
		unique: true,
		lowercase: true,
		validate: {
			validator: (val) => {
				return /^\w+@\w+\.\w+$/.test(val);
			},
			message: 'Invalid Email',
		},
	},
	googleId: {
		type: Number,
		required: [true, 'Google ID is required'],
	},
});

module.exports = mongoose.model('Users', userSchema);
