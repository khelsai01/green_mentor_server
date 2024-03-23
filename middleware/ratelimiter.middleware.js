const rateLimiter = require("express-rate-limit");

const limiter = rateLimiter({
    windowMs: 10 * 60 * 1000, 
	max: 70, 
	standardHeaders: 'draft-7', 
	legacyHeaders: false, 
});

module.exports = {limiter}