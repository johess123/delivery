const appModel = require("../models/app_model")
//const formidable = require("formidable");
const fs = require('fs');
const path = require('path');
var jwt = require('jsonwebtoken');
const appController = {
	// 會收到送餐員登入token
	// 用token取得送餐員的帳號
	// 用帳號取得送餐員資料
	// 用外送員資料取得送餐表,再取得當日案主資料
	// 回傳該送餐員當日要送餐的案主資料
	shipment: async (req,res) => {
		// 取得token
		// Xamarin
		const authorizationHeader = req.headers.authorization;
		var token = ""
		if (authorizationHeader && authorizationHeader.split(' ')[0] === 'Token') {
			token = authorizationHeader.split(' ')[1];
		} else {
			console.log('error');
		}
		// POSTMAN
		/*
		const token = req.headers.token;
		console.log("----------------------");
		console.log(token);
		*/
		// 取得送餐員帳號
		const user = jwt.verify(token, 'tommygood', async (err,decoded) => {
			if (err) {
				console.log("Invalid token");
			} else {
				const s_num = decoded["payload"]["s_num"];
				// 取得送餐員編號
				//console.log(s_num);
				dp_s_num = await new Promise((resolve, reject) => {
					appModel.get_dp_s_num(s_num,(err,result) => {
						if (err) {
							reject(err);
						} else {
							resolve(result[0].s_num);
						}
					});
				});
				//console.log(dp_s_num);
				// 取得當日送餐案主資料
				appModel.shipment(dp_s_num,(err,result) => {
					const dataArray = [];
					//console.log(result);
					//console.log("---------------------");
					result.forEach((row) => {
						const data = {
							ct_s_num: row.ct_s_num,
							ct_name: row.ct_name,
							ct_lastname: row.ct_lastname,
							ct_gender: row.ct_gender,
							ct_time: row.ct_time,
							ct_type: row.bo_s_num,
							ct_lon: row.ct_lon,
							ct_lat: row.ct_lat,
							status: row.status,
						};
						dataArray.push(data);
					});
					//console.log(dataArray);
					// 回傳案主資料
					res.json({
						daily_shipment :dataArray
					})
				})
			}
		});
	},
	// 案主健康紀錄
	client_health: async (req,res) => {
		// 取得token
		const authorizationHeader = req.headers.authorization;
		var token = ""
		if (authorizationHeader && authorizationHeader.split(' ')[0] === 'Token') {
			token = authorizationHeader.split(' ')[1];
		} else {
			console.log('error');
		}
		// 取得送餐員帳號
		const user = jwt.verify(token, 'tommygood', async (err,decoded) => {
			if (err) {
				console.log("Invalid token");
			} else {
				const s_num = decoded["payload"]["s_num"];
				// 取得送餐員編號
				dp_s_num = await new Promise((resolve, reject) => {
					appModel.get_dp_s_num(s_num,(err,result) => {
						if(err) {
							reject(err);
						} else {
							resolve(result[0].s_num);
						}
					});
				});
				//console.log(dp_s_num);
				const ct_s_num = req.body.ct_s_num;

				const today = new Date();
				const year = today.getFullYear();
				const month = String(today.getMonth() + 1).padStart(2, '0');
				const day = String(today.getDate()).padStart(2, '0');
				const hour = today.getHours();
				const minute = today.getMinutes();
				const second = today.getSeconds();
				const currentDate = `${year}-${month}-${day}`;	
				const currentTime = `${hour}:${minute}:${second}`;
				// 取得app傳過來的圖片
				var fileName = null;
				if (req.file) {
					const file = req.file;
					const originalName = file.originalname.split('.');
					const extensionName = originalName[originalName.length-1];
					fileName = dp_s_num+"_"+ct_s_num+"_"+currentDate+"_"+currentTime+"."+extensionName;
					const filePath = path.join(__dirname,"../img/status/"+fileName);
					fs.renameSync(file.path, filePath);
					//console.log(filePath);
				}
				// 存進db
				appModel.client_status(dp_s_num,req.body,fileName,(err) => {
					if (err) {
						res.json({state: false});
					} else {
						res.json({state: true});
					}
				})
			}
		})
	},
	// 驗證帳號登入,回傳token或失敗訊息
	login: async(req,res) => {
		console.log("登入");
		// 取得輸入的帳密
		if (typeof(req.body.acc_user) !== 'undefined' && typeof(req.body.acc_password) !== 'undefined') {
			const user = req.body.acc_user;
			const pw = req.body.acc_password;
			// 登入驗證
			result = await new Promise((resolve, reject) => {
				appModel.login(user,pw,(err,result) => {
					if (result.length === 0) { // 登入失敗
						res.json({state: false});
					} else { // 登入成功
						resolve(result[0]);
					}
				});
			});
			// 產生token
			const payload = {
				s_num : result.s_num,
				user: result.user,
				identity: result.identity,
				name: result.name
			};
			const secret_key = 'tommygood';
			//const token = jwt.sign({payload, exp: Math.floor(Date.now()/1000)+60*15}, secret_key);
			const token = jwt.sign({payload},secret_key);
			// 回傳token和登入的時間
			const loginTime = new Date();
			const currentYear = loginTime.getFullYear();
			var currentMonth = (loginTime.getMonth() + 1).toString();
			if (currentMonth.length == 1) {
				currentMonth = "0"+currentMonth;
			}
			var currentDate = loginTime.getDate().toString();
			if (currentDate.length == 1) {
				currentDate = "0"+currentDate;
			}
			var currentHour = loginTime.getHours().toString();
			if (currentHour.length == 1) {
				currentHour = "0"+currentHour;
			}
			var currentMinute = loginTime.getMinutes().toString();
			if (currentMinute.length == 1) {
				currentMinute = "0"+currentMinute;
			}
			var  currentSecond = loginTime.getSeconds().toString();
			if (currentSecond.length == 1) {
				currentSecond = "0"+currentSecond;
			}
			// 取得送餐員編號
			//console.log(result.s_num);
			dp_s_num = await new Promise((resolve, reject) => {
				appModel.get_dp_s_num(result.s_num,(err,result) => {
					if(err) {
						reject(err);
					} else {
						//console.log(result);
						resolve(result[0].s_num);
					}
				});
			});
			//console.log(dp_s_num);
			const { DateTime } = require('luxon');
			const date = DateTime.local().setZone('Asia/Taipei').toISODate();
			//console.log(date)
			// 取得送餐員當日送餐路線編號
			const user_name = result.name;
			appModel.get_reh_s_num(dp_s_num,date,(err,result) => {
				if (result.length != 0) {
					const reh_s_num = result[0].reh_s_num;
					// 回傳資料
					res.json({
						acc_user: user,
						acc_password: pw,
						state: true,
						acc_token: token,
						acc_name: user_name,
						reh_s_num: reh_s_num,
						dp_s_num: dp_s_num,
						login_date: `${currentYear}-${currentMonth}-${currentDate}`,
						login_time: `${currentHour}-${currentMinute}-${currentSecond}`
					})
				} else {
					res.json({today_data: false})
				}
			})
		}
	}
}

module.exports = appController
