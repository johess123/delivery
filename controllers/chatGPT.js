const foodModel = require("../models/food")
const functionModel = require("../models/function")
const opinionModel = require("../models/opinion")
const bentoModel = require("../models/bento")
var jwt = require('jsonwebtoken');
const checkLogin = (req,res) => {
	try {
		const user = jwt.verify(req.cookies.token, 'tommygood');
		return true;
	} catch(e) {
		console.log(e);
		return false;
	}
}
const chatGPTController = {
	bento_all: (req,res) => {
		bentoModel.chatGPT_all((err,results) => {
			if (err) {
				res.status(500).send(err);
			} else {
				result = {};
				for (let i = 0; i < results.length; i++) {
					if (result.hasOwnProperty(results[i].bo_name)) {
						result[results[i].bo_name] = result[results[i].bo_name]+"//"+results[i].ds_name;
					} else {
						result[results[i].bo_name] = results[i].ds_name;
					}
				}
				result_array = [];
				for (let key in result) {
					result_array.push({name:key,dishes:result[key]})
				};
				res.json(result_array);
			}
		})
	},
	food_all: (req,res) => {	
		//if (checkLogin(req,res) == true) {
		foodModel.all((err,results) => {
			if (err) {
				res.status(500).send(err);
			} else {
				res.json(results);
			}
		})
		//}
	},
	food_detail: async(req,res) => {
		var name = req.body["message"];
		name = name.split(',');
		console.log(name)
		var all_result = []
		for (let i = 0; i < name.length; i++) {
			const results = await new Promise((resolve,reject) => {
				foodModel.name_search(name[i],(err,results) => {
					if (err) {
						res.status(500).send(err);
					} else {
						resolve(results);
					}
				});
			});
			all_result.push(results);
		}
		console.log(all_result);
		res.json(all_result);
	},
	food_name: (req,res) => {
		foodModel.all_name((err,results) => {
			if (err) {
				res.status(500).send(err);
			} else {
				res.json(results);
			}
		})
	},
	function_all: (req,res) => {	
		//if (checkLogin(req,res) == true) {
		functionModel.all((err,results) => {
			if (err) {
				res.status(500).send(err);
			} else {
				res.json(results);
			}
		})
		//}
	},
	opinion: (req,res) => {
		console.log(req.body);
		const moment = require('moment-timezone');
		const date = moment().format('YYYY-MM-DD');
		opinionModel.record(req.body,date,(err) => {
			if (err) {
				res.status(500).send(err);
			} else {
				res.json({suc:true});
			}
		})
	}
}

module.exports = chatGPTController
