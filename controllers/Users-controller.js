const { catchAsync } = require('../utils/helpers');

module.exports.getAllUsers = catchAsync(async (req, res, next) => {
	res.status(200).json({
		status: 200,
		body: 'Get all users',
	});
});

module.exports.getUser = catchAsync(async (req, res, next) => {
	res.status(200).json({
		status: 200,
		body: 'Get or Create user',
	});
});

module.exports.updateUser = catchAsync(async (req, res, next) => {
	res.status(200).json({
		status: 200,
		body: 'Update user',
	});
});

module.exports.deleteUser = catchAsync(async (req, res, next) => {
	res.status(200).json({
		status: 200,
		body: 'Delete user',
	});
});
