const db = require('mariadb');
const pool = db.createPool({
	host: 'localhost',
	user: 'kenny',
	password: 'Kenny061256',
	database: 'delivery_food'
});

const carbonModel = {
	record: (data,date,cb) => {
		pool.getConnection()
			.then(conn => {
				conn.query('select * from route_carbon where reh_s_num=? and date=?;',[data['reh_s_num'],date])
					.then(results => {
						if (results.length == 0) {
							const values = [
								data['reh_s_num'],
								date,
								data['scooter_carbon'],
								data['this_route_km[km]']
							]
							conn.query('insert into route_carbon set reh_s_num=?, date=?, quality=?, km=?;',values)
								.then(() => {
									conn.release();
									cb(null);
								})
						} else {
							const values = [
								data['scooter_carbon'],
								data['this_route_km[km]'],
								data['reh_s_num'],
								date
							]
							conn.query('update route_carbon set quality=?, km=? where reh_s_num=? and date=?;',values)
								.then(() => {
									conn.release();
									cb(null);
								})
						}
					})
			})
			.catch(error => {
				console.error(error);
			});
	},
	month: (month,cb) => {
		pool.getConnection()
			.then(conn => {
				conn.query('select * from route_carbon where MONTH(date)=?;',[month])
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

module.exports = carbonModel
