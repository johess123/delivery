const db = require('mariadb');
const pool = db.createPool({
	host: 'localhost',
	user: 'kenny',
	password: 'Kenny061256',
	database: 'delivery_food'
});

const loginModel = {
	check_regist: (data,cb) => {
		const {user,pw,identity,name} = data;
		const values = [
			user
		];
		pool.getConnection()
			.then(conn => {
				conn.query('select * from user where user=?;',values)
					.then(results => {
						conn.release();
						cb(null,results);
					})
			})
			.catch(error => {
				console.error(error);
			});
	},
	regist: (data,cb) => {
		const {user,pw,identity,name} = data;
		const values = [
			user,
			pw,
			identity,
			name
		];
		pool.getConnection()
			.then(conn => {
				conn.query('insert into user set user=?,pw=?,identity=?,name=?;',values)
					.then(() => {
						conn.release();
						cb(null);
					})
			})
			.catch(error => {
				console.error(error);
			});
	},
	login: (data,cb) => {
		const {user,pw} = data;
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
	}
}

module.exports = loginModel
