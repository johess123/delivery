const db = require('mariadb');
const pool = db.createPool({
	host: 'localhost',
	user: 'kenny',
	password: 'Kenny061256',
	database: 'delivery_food'
});

const reportModel = {
	day: (date,cb) => {
		pool.getConnection()
			.then(conn => {
				conn.query('select * from daily_report where date=?;',[date])
					.then(results => {
						conn.release();
						cb(null,results);
					})
			})
			.catch(error => {
				console.error(error);
			});
	},
	month: (month,cb) => {
		pool.getConnection()
			.then(conn => {
				conn.query('select * from monthly_report where MONTH(date)=?;',[month])
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

module.exports = reportModel
