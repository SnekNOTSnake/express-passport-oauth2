module.exports.greetings = (req, res) => {
	res.status(200).json({
		status: 200,
		message: req.user
			? `Greetings, ${req.user.name}`
			: 'Greetings, mine own guest.',
	});
};

module.exports.getMe = (req, res) => {
	res.status(200).json(req.user);
};
