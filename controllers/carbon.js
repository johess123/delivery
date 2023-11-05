const carbonModel = require("../models/carbon")
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
const carbonController = {
	page: (req,res) => {
		user = checkLogin(req,res);
		if (user != false) {
			res.render('carbon',{
				user: user["payload"].name,
				alert1: false
			})
		} else {
			res.redirect('/login')
		}
	},
	get_carbon: (req,res) => {
		console.log(req.body)
		const moment = require('moment-timezone');
		const date = moment().format('YYYY-MM-DD');
		//if (checkLogin(req,res) == true) {
		carbonModel.record(req.body,date,(err) => {
			if (err) {
				res.json({state: false});
			} else {
				res.json({state: true});
			}
		})
		//}
	},
	month: (req,res) => {	
		const moment = require('moment-timezone');
		const lastMonth = moment().subtract(1, 'months').month()+1;
		if (checkLogin(req,res) != false) {
			carbonModel.month(lastMonth,(err,results) => {
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

module.exports = carbonController
