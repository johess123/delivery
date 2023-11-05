const db = require('mariadb');
const pool = db.createPool({
	host: 'localhost',
	user: 'kenny',
	password: 'Kenny061256',
	database: 'delivery_food'
});

const opinionModel = {
	record: (data,date,cb) => {
		const values = [
			date,
			data["message"]
		];
		pool.getConnection()
			.then(conn => {
				conn.query('insert into opinion set date=?, content=?;',values)
					.then(() => {
						conn.release();
						cb(null);
					})
			})
			.catch(error => {
				console.error(error);
			});
	},
	all: (cb) => {
		pool.getConnection()
			.then(conn => {
				conn.query('select * from opinion order by date desc;')
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

module.exports = opinionModel
