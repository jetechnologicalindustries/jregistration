const moment = require('moment');
const tynt = require('tynt');

const logger = (req, res, next) => {
  	console.log(
	  `${tynt.Yellow(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"))}` + ` : ${tynt.Green('Accessed')} : ` + `${req.protocol}://${req.get('host')}${
	    req.originalUrl
	  }`
	);
  next();
};

module.exports = logger;
