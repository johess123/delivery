const reportModel = require("../models/report")
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
const reportController = {
	page: (req,res) => {
		user = checkLogin(req,res);
		if (user != false) {
			res.render('report',{
				user: user["payload"].name,
				alert1: false
			})
		} else {
			res.redirect('/login')
		}
	},
	day: (req,res) => {
		const moment = require('moment-timezone');
		const date = moment().format('YYYY-MM-DD');
		user = checkLogin(req,res);
		if (user != false) {
			reportModel.day(date,(err,results) => {
				for (let i = 0; i < results.length; i++) {
					results[i].date = moment.utc(results[i].date).tz('Asia/Taipei').format('YYYY-MM-DD');
				}
				res.json(results);
			})
		} else {
			res.redirect('/login')
		}
	},	
	month: (req,res) => {	
		const moment = require('moment-timezone');
		const lastMonth = moment().subtract(1, 'months').month()+1;
		user = checkLogin(req,res);
		if (user != false) {
			reportModel.month(lastMonth,(err,results) => {
				for (let i = 0; i < results.length; i++) {
					results[i].date = moment.utc(results[i].date).tz('Asia/Taipei').format('YYYY-MM-DD');
				}
				res.json(results);
			})
		} else {
			res.redirect('/login')
		}
	}
}

module.exports = reportController
