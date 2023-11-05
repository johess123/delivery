const db = require('mariadb');
const pool = db.createPool({
	host: 'localhost',
	user: 'kenny',
	password: 'Kenny061256',
	database: 'delivery_food'
});

const foodModel = {
	all: (cb) => {
		pool.getConnection()
			.then(conn => {
				conn.query('select * from dishes')
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
				conn.query('select * from dishes where s_num = ?', [id])
					.then(results => {
						conn.release();
						cb(null,results);
					})
			})
			.catch(error => {
				console.error(error);
			});
	},
	name_search: (name,cb) => {
		pool.getConnection()
			.then(conn => {
				conn.query('select * from dishes where ds_name = ?', [name])
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
		//console.log(data)
		const description = Object.keys(data).filter(key => key.startsWith('description'));
		var all_description = data['food_type']+"//";
		var count = 0;
		description.forEach(field => {
			count += 1;
			if (count === description.length) {
				all_description = all_description+data[field];
			} else {
				all_description = all_description+data[field]+"//";
			}
			//console.log(data[field]);
		});
		//console.log(all_description);
		//console.log(data);
		const values = [
			data['ds_name'],
			all_description,
			data['price']
		];
		pool.getConnection()
			.then(conn => {
				conn.query('insert into dishes set ds_name=?,description=?,price=?;',values)
					.then(() => {
						conn.release();
						cb(null);
					})
			})
			.catch(error => {
				console.error(error);
			});
	},
	update: (id,data,cb) => {
		const description = Object.keys(data).filter(key => key.startsWith('description'));
		var all_description = data['food_type']+"//";
		var count = 0;
		description.forEach(field => {
			count += 1;
			if (count === description.length) {
				all_description = all_description+data[field];
			} else {
				all_description = all_description+data[field]+"//";
			}
			//console.log(data[field]);
		});
		const values = [	
			data['ds_name'],
			all_description,
			data['price'],
			id
		];
		pool.getConnection()
			.then(conn => {
				conn.query('update dishes set ds_name=?,description=?,price=? where s_num=?;',values)
					.then(() => {
						conn.release();
						cb(null);
					})
			})
			.catch(error => {
				console.error(error);
			});
	},
	delete: (id,cb) => {
		pool.getConnection()
			.then(conn => {
				conn.query('delete from dishes where s_num = ?',[id])
					.then(() => {
						conn.release();
						cb(null);
					})
			})
			.catch(error => {
				console.error(error);
			});
	},
	all_name: (cb) => {
		pool.getConnection()
			.then(conn => {
				conn.query('select ds_name from dishes;')	
					.then(results => {
						conn.release();
						cb(null,results);
					})
			})
			.catch(error => {
				console.error(error);
			});
	}
}

module.exports = foodModel
