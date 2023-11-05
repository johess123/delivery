const db = require('../db');

// 建立一個 todoModel 物件，裡面放存取資料的方法（function）
const clientModel = {
	getAll: (cb) => {
		db.query(
			'select * from clients', (err,results) => {
				if (err) return cb(err);
				cb(null,results);
			});
	},
	/*get: (id,cb) => {
		db.query(
			'select * from todo where id = ?', [id], (err,results) => {
				if (err) return cb(err);
				cb(null,results);
			});
	}*/
}

module.exports = clientModel
