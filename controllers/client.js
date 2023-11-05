const clientModel = require("../models/client")
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
const clientController = {
	api_all: (req,res) => {	
		if (checkLogin(req,res) != false) {
			clientModel.all((err,results) => {
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
			res.render('client/client',{user:user["payload"].name})
		} else {
			res.redirect('/login')
		}
	},
	create: (req,res) => {
		user = checkLogin(req,res);
		if (user != false) {
			if (req.method === 'GET') {
				res.render('client/create',{
					user: user["payload"].name,
					alert1: false
				})
			} else {
				clientModel.create(req.body,(err) => {
					if (err) return console.log(err);
					res.render('client/create',{
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
			clientModel.search(id,(err,results) => {
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
			res.render('client/detail', {
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
				res.render('client/update', {
					user: user["payload"].name,
					id: id
				})
			} else {
				clientModel.update(id, req.body, (err) => {
					if (err) return console.log(err);
					return res.json({suc: true})
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
			clientModel.delete(id,(err) => {
				if (err) return console.log(err);
				return res.json({suc: true})
			})
		} else {		
			return res.json({suc: true})
		}
	}
}

module.exports = clientController
