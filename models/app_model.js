const db = require('mariadb');
const pool = db.createPool({
	host: 'localhost',
	user: 'kenny',
	password: 'Kenny061256',
	database: 'delivery_food'
});
const appModel = {
	// 登入驗證
	login: (user,pw,cb) => {
		const values = [
			user,
			pw
		];
		pool.getConnection()
			.then(conn => {
				conn.query('select * from user where user=? and pw=?',values)
					.then(results => {
						conn.release();
						cb(null,results);
					})
			})
			.catch(error => {
				console.error(error);
			});
	},
	// 取得送餐員當日路線編號
	get_reh_s_num: (dp_s_num,date,cb) => {
		const values = [
			dp_s_num,
			date
		];
		pool.getConnection()
			.then(conn => {
				conn.query('select * from daily_shipment where dp_s_num=? and date=?',values)	
					.then(results => {
						conn.release();
						cb(null,results);
					})
			})
			.catch(error => {
				console.error(error);
			});
	},
	client_status: (dp_s_num,data,filePath,cb) => {	
		const today = new Date();
		const year = today.getFullYear();
		const month = String(today.getMonth() + 1).padStart(2, '0');
		const day = String(today.getDate()).padStart(2, '0');
		const hour = today.getHours();
		const minute = today.getMinutes();
		const second = today.getSeconds();
		const currentDate = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
		const values = [
			data.ct_s_num,
			currentDate,
			data.note,
			filePath,
			dp_s_num,
			data.status1,
			data.status2
		]
		pool.getConnection()
			.then(conn => {
				conn.query('insert into clients_status set ct_s_num=?,date=?,remark=?,cs_img=?,dp_s_num=?,status1=?,status2=?;',values)
					.then(() => {
						conn.release();
						cb(null);
					})
			})
			.catch(error => {
				console.error(error);
			});
	},
	// 用帳號編號取得送餐員編號
	get_dp_s_num: (s_num,cb) => {
		pool.getConnection()
			.then(conn => {
				conn.query('select * from delivery_person where ur_s_num=?',[s_num])
					.then(results => {
						conn.release();
						cb(null,results);
					})
			})
			.catch(error => {
				console.error(error);
			});
	},
	shipment: (dp_s_num,cb) => { // 把該名送餐員當日要送的案主資料撈出來
		const today = new Date();
		const year = today.getFullYear();
		const month = String(today.getMonth() + 1).padStart(2, '0');
		const day = String(today.getDate()).padStart(2, '0');
		const currentDate = `${year}-${month}-${day}`;
		// 送餐員編號和當天日期
		const values = [
			dp_s_num,
			currentDate
		];
		pool.getConnection()
			.then(conn => {
				const sql_query = `select * from clients,(select ct_s_num from daily_shipment where dp_s_num=? and date=?) as a where ct_s_num=clients.s_num`;
				conn.query(sql_query,values)
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

module.exports = appModel
