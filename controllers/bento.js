const bentoModel = require("../models/bento")
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
const bentoController = {
	api_all: (req,res) => {	
		if (checkLogin(req,res) != false) {
			bentoModel.all((err,results) => {
				if (err) {
					res.status(500).send(err);
				} else {
					res.json(results);
				}
			})
		}
	},
	all: (req,res) => {
		user = checkLogin(req,res);
		if (user != false) {
			res.render('bento/bento',{user:user["payload"].name})
		} else {
			res.redirect('/login')
		}
	},
	api_detail: (req,res) => {
		user = checkLogin(req,res);
		if (user != false) {
			const id = req.params.id;
			bentoModel.search(id,(err,results) => {
				if (err) {
					res.status(500).send(err);
				} else {
					res.json(results);
				}
			})
		}
	},
	detail: (req,res) => {
		user = checkLogin(req,res);
		if (user != false) {
			const id = req.params.id;
			res.render('bento/detail', {
				user: user["payload"].name,
				id: id
			})
		} else {
			res.redirect('/login');
		}
	},
	api_create: (req,res) => { // 列出可選的菜色
		user = checkLogin(req,res);
		if (user != false) {
			bentoModel.get_food((err,results) => {
				if (err) {
					res.status(500).send(err);
				} else {
					res.json(results);
				}
			})
		}
	},
	create: (req,res) => {
		user = checkLogin(req,res);
		if (user != false) {
			if (req.method === 'GET') {
				res.render('bento/create',{
					user: user["payload"].name,
					alert1: false
				})
			} else {
				bentoModel.create(req.body,(err) => {
					if (err) return console.log(err);
					return res.json({suc: true});
				})
			}	
		} else {
			res.redirect('/login');
		}
	},
	update: (req,res) => {
		user = checkLogin(req,res);
		if (user != false) {
			const id = req.params.id;
			if (req.method === 'GET') {
				res.render('bento/update', {
					user: user["payload"].name,
					id: id
				})
			} else {
				bentoModel.update(id, req.body, (err) => {
					if (err) return console.log(err);
					return res.json({suc: true});
				})
			}
		} else {
			res.redirect('/login')
		}
	},
	delete: (req,res) => {
		user = checkLogin(req,res);
		if (user != false) {
			const id = req.params.id;
			bentoModel.delete(id,(err) => {
				if (err) return console.log(err);
			})
			return res.json({suc: true})
		} else {
			return res.json({suc: false})
		}
	}
}

module.exports = bentoController
