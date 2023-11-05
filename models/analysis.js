const db = require('mariadb');
const pool = db.createPool({
	host: 'localhost',
	user: 'kenny',
	password: 'Kenny061256',
	database: 'delivery_food'
});

const analysisModel = {
	record: (data,cb) => {
		values = [
			data["reh_s_num"],
			data["dp_s_num"],
			data["ph_time"],
			data["analysis_num"]
		]
		pool.getConnection()
			.then(conn => {
				conn.query('insert into analysis set reh_s_num=?, dp_s_num=?, ph_time=?, analysis_num=?;',values)
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
				conn.query('select * from analysis order by ph_time desc;')
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
				conn.query('select * from analysis where MONTH(ph_time)=?;',[month])
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

module.exports = analysisModel
