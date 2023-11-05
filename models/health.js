const db = require('mariadb');
const pool = db.createPool({
	host: 'localhost',
	user: 'kenny',
	password: 'Kenny061256',
	database: 'delivery_food'
});
const healthModel = {
	all: (cb) => {	
		pool.getConnection()
			.then(conn => {
				conn.query('select clients.s_num,clients.ct_name,clients.ct_lastname,clients_status.date from clients,clients_status where clients.s_num=clients_status.ct_s_num order by date desc')
					.then(results => {
						conn.release();
						cb(null,results);
					})
			})
			.catch(error => {
				console.error(error);
			});
	},
	search: (id,date,cb) => {
		console.log(date);
		pool.getConnection()
			.then(conn => {
				conn.query('select clients.s_num,clients.ct_name,clients.ct_lastname,clients_status.date,clients_status.remark,clients_status.cs_img,clients_status.dp_s_num,clients_status.status1,clients_status.status2 from clients, clients_status where clients.s_num=clients_status.ct_s_num and clients.s_num=? and clients_status.date=?',[id,date])
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

module.exports = healthModel
