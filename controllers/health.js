const healthModel = require("../models/health")
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
const healthController = {
	all: (req,res) => {
		user = checkLogin(req,res);
		if (user != false) {
			res.render('health/health',{user:user["payload"].name})
		} else {
			res.redirect('/login')
		}
	},
	api_all: (req,res) => {
		user = checkLogin(req,res);
		if (user != false) {
			healthModel.all((err,results) => {
				if (err) {
					res.status(500).send(err);
				} else {
					const moment = require('moment-timezone');
					for (let i = 0; i < results.length; i++) {
						results[i].date = moment.utc(results[i].date).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
					}
					res.json(results);
				}
			})
		}
	},
	detail: (req,res) => {
		user = checkLogin(req,res);
		if (user != false) {
			const id = req.params.id;
			const date = req.params.date;
			res.render('health/detail',{
				id: id,
				date: date,
				user: user["payload"].name
			})
		} else {
			res.redirect('/login')
		}
	},
	api_detail: (req,res) => {
		user = checkLogin(req,res);
		if (user != false) {
			const id = req.params.id;
			const date = req.params.date;
			healthModel.search(id,date,(err,results) => {
				if (err) {
					res.status(500).send(err);
				} else {
					const moment = require('moment-timezone');
					results[0].date = moment.utc(results[0].date).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
					res.json(results[0]);
				}
			})
		}
	}
}

module.exports = healthController
