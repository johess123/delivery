const deliveryModel = require("../models/delivery")
const fs = require('fs');
const path = require('path');
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
const deliveryController = {
	api_all: (req,res) => {
		if (checkLogin(req,res) != false) {
			deliveryModel.all((err,results) => {
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
			res.render('delivery/delivery',{user:user["payload"].name})
		} else {	
			res.redirect('/login')
		}
	},
	api_create: (req,res) => { // 列出可新增的送餐員
		user = checkLogin(req,res);
		if (user != false) {
			deliveryModel.get_user((err,results) => {
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
				res.render('delivery/create',{
					user: user["payload"].name,
					alert1: false
				})
			} else {
				var fileName = null
				if (req.file) {
					const file = req.file;
					const originalName = file.originalname.split('.');
					const extensionName = originalName[originalName.length-1];
					// 用送餐員帳號(user)的編號(s_num)來命名
					fileName = "dp_"+req.body.ur_s_num+"."+extensionName;
					const filePath = path.join(__dirname,"../img/dp/"+fileName);
					fs.renameSync(file.path, filePath); // 把圖片保存到該路徑
				}
				deliveryModel.create(req.body,fileName,(err) => {
					if (err) return console.log(err);
					res.render('delivery/create',{
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
			deliveryModel.search(id,(err,results) => {
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
			res.render('delivery/detail',{
				user: user["payload"].name,
				id: id
			})
		} else {	
			res.redirect('/login')
		}
	},
	update: async (req,res) => {
		user = checkLogin(req,res);
		const id = req.params.id;
		if (user != false) {
			if (req.method === 'GET') {
				res.render('delivery/update', {
					user: user["payload"].name,
					id: id
				})
			} else {
				var newFileName = "";
				if (req.file) {
					const file = req.file;
					const originalName = file.originalname.split('.');
					const extensionName = originalName[originalName.length-1];
					// 刪除圖片
					data = await new Promise((resolve, reject) => {
						deliveryModel.search(id,(err,results) => {
							const data = {"ur_s_num": results[0].ur_s_num,"dp_img":results[0].dp_img};
							resolve(data);
						});
					});
					const oldFilePath = path.join(__dirname,"../img/dp/"+data.dp_img);
					console.log("舊路徑"+oldFilePath);
					fs.unlink(oldFilePath,err => {
						if (err) {
							console.error(err);
						} else {
							console.log('刪除成功');
						}
					});
					newFileName = "dp_"+data.ur_s_num+"."+extensionName;
					const newFilePath = path.join(__dirname,"../img/dp/"+newFileName);
					console.log("新路徑"+newFilePath);
					fs.renameSync(file.path, newFilePath); // 把圖片保存到該路徑
				}
				console.log(newFileName);
				deliveryModel.update(id, req.body, newFileName,(err) => {
					if (err) return console.log(err);
				})
				res.render('delivery/update', {
					user: user["payload"].name,
					id: id
				});
			}
		} else {	
			res.redirect('/login')
		}
	},
	delete: async (req,res) => {
		user = checkLogin(req,res);
		if (user != false) {
			const id = req.params.id;
			// 刪除圖片
			fileName = await new Promise ((resolve, reject) => {
				deliveryModel.search(id,(err,results) => {
					resolve(results[0].dp_img);
				});
			});
			const filePath = path.join(__dirname,"../img/dp/"+fileName);
			fs.unlink(filePath,err => {
				if (err) {
					console.error(err);
				} else {
					console.log('刪除成功');
				}
			});
			deliveryModel.delete(id,(err) => {
				if (err) return console.log(err);
			})
			return res.json({suc: true})
		} else {	
			res.redirect('/login')
		}
	}
}

module.exports = deliveryController
