const loginModel = require("../models/login")
var jwt = require('jsonwebtoken');
const loginController = {
	regist: (req,res) => {
		if (req.method === 'GET') {
			res.render('regist',{
				alert1: false,
				alert2: false
			})
		} else {
			loginModel.check_regist(req.body,(err,result) => {
				if (result.length !== 0) {
					res.render('regist',{
						alert1: true, // 已有同名帳號
						alert2: false
					})
				} else {
					loginModel.regist(req.body,(err) => {
						if (err) return console.log(err);
						res.render('regist',{
							alert2: true, // 註冊成功
							alert1: false
						})
					})
				}
			})
		}
	},
	login: (req,res) => {
		if (req.method === 'GET') {
			try {
				const user = jwt.verify(req.cookies.token, 'tommygood');
				res.redirect('main');
			} catch(e) {
				console.log(123)
				res.render('login',{
					alert1: false
				});
			}
		} else {
			loginModel.login(req.body,(err,result) => {
				if (result.length === 0) {
					res.render('login',{
						alert1: true, // 帳密錯誤
					})
				} else {
					const payload = {
						user: result[0].user,
						identity: result[0].identity,
						name: result[0].name
					};
					const secret_key = 'tommygood';
					const token = jwt.sign({payload, exp: Math.floor(Date.now()/1000)+60*15}, secret_key);
					res.cookie('token', token,  { httpOnly: false, secure: false, maxAge: 3600000 });
					res.redirect('main')
				}
			})
		}
	},
	main: (req,res) => {
		try {
			const user = jwt.verify(req.cookies.token, 'tommygood');
			res.render('main',{user:user["payload"].name});
		} catch(e) {
			console.log(e)
			res.clearCookie('token');
			res.redirect('login')
		}
	},
	logout: (req,res) => {
		try {
			const user = jwt.verify(req.cookies.token, 'tommygood');
			res.clearCookie('token');
			res.redirect('login')
		} catch(e) {
			console.log(e)
			res.redirect('login')
		}
	}
}

module.exports = loginController
