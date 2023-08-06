const { expressjwt } = require("express-jwt");

/* Function used to extract JWT token from the req's "Authorization" Headers */
const getTokenFromHeaders = (req) => {
	/* Check if token is available on req Headers */
	if (
		req.headers.authorization &&
		req.headers.authorization.split(" ")[0] === "Bearer"
	) {
		/* Get encoded token string and return it */
		const token = req.headers.authorization.split(" ")[1];
		return token;
	}
	return null;
};

/* Instantiate JWT token validation middleware */
const isAuthenticated = expressjwt({
	secret: process.env.TOKEN_SECRET,
	algorithms: ["HS256"],
	requestProperty: "payload",
	getToken: getTokenFromHeaders,
});

module.exports = { isAuthenticated };
