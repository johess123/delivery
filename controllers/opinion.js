const opinionModel = require("../models/opinion")
var jwt = require('jsonwebtoken');
const checkLogin = (req,res) => {
	try {
		const user = jwt.verify(req.cookies.token, 'tommygood');
		return user;
	} catch(e) {
		console.log(e);
		return false;
	}
}
const opinionController = {
	page: (req,res) => {
		user = checkLogin(req,res);
		if (user != false) {
			res.render('opinion',{user:user["payload"].name})
		} else {
			res.redirect('/login')
		}
	},
	api_all: (req,res) => {
		user = checkLogin(req,res);
		if (user != false) {
			opinionModel.all((err,results) => {
				if (err) {
					res.status(500).send(err);
				} else {
					const moment = require('moment-timezone');
					for (let i = 0; i < results.length; i++) {
						results[i].date = moment.utc(results[i].date).tz('Asia/Taipei').format('YYYY-MM-DD');
					}
					res.json(results);
				}
			})
		}
	}
}

module.exports = opinionController
