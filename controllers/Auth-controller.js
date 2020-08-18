module.exports.protect = (req, res, next) => {
	if (!req.user) next('You must be logged in to get in here');
	next();
};
