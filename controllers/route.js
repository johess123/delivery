// 導入 model 裡的 todo
const routeModel = require("../models/route")
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
const routeController = {
	api_all: (req,res) => {
		if (checkLogin(req,res) != false) {
			routeModel.all((err,results) => {
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
			res.render('route/route',{user:user["payload"].name})
		} else {
			res.redirect('/login')
		}
	},
	create: (req,res) => {
		user = checkLogin(req,res);
		if (user != false) {
			if (req.method === 'GET') {
				res.render('route/create',{
					user: user["payload"].name,
					alert1: false
				})
			} else {
				routeModel.create(req.body,(err) => {
					if (err) return console.log(err);
					res.render('route/create',{
						user: user["payload"].name,
						alert1: true
					})
				})
			}
		} else {	
			res.redirect('/login')
		}
	},
	api_detail: (req,res) => {
		user = checkLogin(req,res);
		if (user != false) {
			const id = req.params.id;
			routeModel.search(id,(err,results) => {
				if (err) {
					res.status(500).send(err);
				} else {
					res.json(results[0]);
				}
			})
		}
	},
	detail: (req,res) => {
		user = checkLogin(req,res);
		const id = req.params.id;
		if (user != false) {
			res.render('route/detail', {
				user: user["payload"].name,
				id: id
			})
		} else {	
			res.redirect('/login')
		}
	},
	update: (req,res) => {
		user = checkLogin(req,res);
		const id = req.params.id;
		if (user != false) {
			if (req.method === 'GET') {
				res.render('route/update', {
					user: user["payload"].name,
					id: id
				})
			} else {
				routeModel.update(id, req.body, (err) => {
					if (err) return console.log(err);
				})
				res.render('route/update', {
					id: id
				});
			}
		} else {	
			res.redirect('/login')
		}
	},
	delete: (req,res) => {
		user = checkLogin(req,res);
		if (user != false) {
			const id = req.params.id;
			routeModel.delete(id,(err) => {
				if (err) return console.log(err);
				return res.json({suc: true})
			})
		} else {	
			res.redirect('/login')
		}
	}
}

module.exports = routeController
