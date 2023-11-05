const db = require('mariadb');
const pool = db.createPool({
	host: 'localhost',
	user: 'kenny',
	password: 'Kenny061256',
	database: 'delivery_food'
});

const routeModel = {
	all: (cb) => {	
		pool.getConnection()
			.then(conn => {
				conn.query('select * from route')
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
				conn.query('select * from route where s_num = ?', [id])
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
		const {s_num,reh_name,reh_category,reh_time} = data;
		const values = [
			s_num,
			reh_name || null,
			reh_category || null,
			reh_time || null
		];
		pool.getConnection()
			.then(conn => {
				conn.query('insert into route set s_num=?,reh_name=?,reh_category=?,reh_time=?;',values)
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
		const {reh_name,reh_category,reh_time} = data;
		const values = [
			reh_name || null,
			reh_category || null,
			reh_time || null,
			id
		];
		pool.getConnection()
			.then(conn => {
				conn.query('update route set reh_name=?,reh_category=?,reh_time=? where s_num=?;',values)
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
				conn.query('delete from route where s_num = ?',[id])
					.then(() => {
						conn.release();
						cb(null);
					})
			})
			.catch(error => {
				console.error(error);
			});
	}
	/*get: (id,cb) => {
		db.query(
			'select * from todo where id = ?', [id], (err,results) => {
				if (err) return cb(err);
				cb(null,results);
			});
	}*/
}

module.exports = routeModel
