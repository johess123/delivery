const analysisModel = require("../models/analysis")
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
const analysisController = {
	page: (req,res) => {
		user = checkLogin(req,res);
		if (user != false) {
			res.render('analysis',{
				user: user["payload"].name,
				alert1: false
			})
		} else {
			res.redirect('/login')
		}
	},
	get_analysis: (req,res) => {
		console.log(req.body);
		analysisModel.record(req.body,(err) => {
			if (err) {
				res.json({state: false});
			} else {
				res.json({state: true});
			}
		})
	},
	api_all: (req,res) => {
		user = checkLogin(req,res);
		if (user != false) {
			analysisModel.all((err,results) => {
				if (err) {
					res.status(500).send(err);
				} else {
					const moment = require('moment-timezone');
					for (let i = 0; i < results.length; i++) {
						results[i].ph_time = moment(results[i].ph_time).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm:ss');
					}
					res.json(results);
				}
			})
		}
	},
	month: (req,res) => {	
		const moment = require('moment-timezone');
		const lastMonth = moment().subtract(1, 'months').month()+1;
		if (checkLogin(req,res) != false) {
			analysisModel.month(lastMonth,(err,results) => {
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

module.exports = analysisController
