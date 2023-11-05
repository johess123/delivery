const db = require('mariadb');
const pool = db.createPool({
	host: 'localhost',
	user: 'kenny',
	password: 'Kenny061256',
	database: 'delivery_food'
});

const bentoModel = {
	get_food: (cb) => {
		pool.getConnection()
			.then(conn => {
				conn.query('select * from dishes')
					.then(results => {
						conn.release();
						cb(null, results);
					})
			})
			.catch(error => {
				console.error(error);
			});
	},
	chatGPT_all: (cb) => {
		pool.getConnection()
			.then(conn => {
				conn.query('select a.s_num,a.bo_name,c.ds_name from bento a,bento_dishes b,dishes c where a.s_num=b.bo_s_num and b.ds_s_num=c.s_num;')
					.then(results => {
						conn.release();
						cb(null, results);
					})
			})
			.catch(error => {
				console.error(error);
			});
	},
	all: (cb) => {
		pool.getConnection()
			.then(conn => {
				conn.query('select * from bento')
					.then(results => {	
						conn.release();
						cb(null,results);
					})
			})
			.catch(error => {
				console.error(error);
			});
	},
	search: (id,cb) => {	
		pool.getConnection()
			.then(conn => {
				conn.query('select bento.s_num,bento.bo_name,a.ds_name,a.ds_s_num, a.price from bento,(select bento_dishes.bo_s_num as b, dishes.ds_name as ds_name, dishes.s_num as ds_s_num, dishes.price from bento_dishes, dishes where bento_dishes.ds_s_num = dishes.s_num)a where bento.s_num=a.b and bento.s_num = ?;', [id])
					.then(results => {
						conn.release();
						cb(null,results);
					})
			})
			.catch(error => {
				console.error(error);
			});
	},
	create: (data,cb) => {
		const food = Object.keys(data).filter(key => key.startsWith('food'));
		var food_s_num = [];
		food.forEach(field => {
			food_s_num.push(data[field])
		})
		var values = [
			data['bo_name'],
		];
		pool.getConnection()
			.then(conn => {
				conn.query('insert into bento set bo_name=?',values)
					.then((insertResult) => {
						const pk = insertResult.insertId; // 取得剛才新增的流水號pk
						for (let i = 0; i < food_s_num.length; i++) {
							values = [
								pk,
								food_s_num[i]
							]
							conn.query("insert into bento_dishes set bo_s_num=?,ds_s_num=?",values)
								.then(() => {
									conn.release();
									if (i == food_s_num.length-1) {
										conn.release();
										cb(null);
									}
								})
								.catch(error => {
									console.error(error);
								});
						}
					})
			})
			.catch(error => {
				console.error(error);
			});
	},
	update: (id,data,cb) => {	
		const food = Object.keys(data).filter(key => key.startsWith('food'));
		var food_s_num = [];
		food.forEach(field => {
			food_s_num.push(data[field])
		})
		console.log(food_s_num);
		var values = [
			data['bo_name'],
			id
		];
		pool.getConnection()
			.then(conn => {
				conn.query('update bento set bo_name=? where s_num=?',values)
					.then(() => {
						conn.query('delete from bento_dishes where bo_s_num=?',[id])
							.then(() => {
								console.log("刪除");
								for (let i = 0; i < food_s_num.length; i++) {
									values = [
										id,
										food_s_num[i]
									]
									console.log(values);
									conn.query("insert into bento_dishes set bo_s_num=?,ds_s_num=?",values)
										.then(() => {
											conn.release();
											if (i == food_s_num.length-1) {
												conn.release();
												console.log("eee");
												cb(null);
											}
										})
										.catch(error => {
											console.error(error);
										});
								}
							})
							.catch(error => {
								console.error(error);
							});
					})
			})
			.catch(error => {
				console.error(error);
			});
	},
	delete: (id,cb) => {
		pool.getConnection()
			.then(conn => {
				conn.query('delete from bento where s_num = ?',[id])
					.then(() => {
						conn.query('delete from bento_dishes where bo_s_num = ?',[id])
							.then(() => {
								cb(null);
							})
					})
			})
			.catch(error => {
				console.error(error);
			});
	}
}

module.exports = bentoModel
