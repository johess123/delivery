const punchModel = require("../models/punch")
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
const punchController = {
	page: (req,res) => {
		user = checkLogin(req,res);
		if (user != false) {
			res.render('punch',{user:user["payload"].name})
		} else {
			res.redirect('/login')
		}
	},
	api_all: (req,res) => {
		user = checkLogin(req,res);
		if (user != false) {
			punchModel.all((err,results) => {
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
	get_punch: (req,res) => {
		req.body = JSON.parse(JSON.stringify(req.body));
		console.log(req.body)
		punchModel.record(req.body,(err) => {
			if (err) {
				res.json({state: false});
			} else {
				res.json({state: true});
			}
		})
	}
}

module.exports = punchController
