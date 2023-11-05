const db = require('mariadb');
const pool = db.createPool({
	host: 'localhost',
	user: 'kenny',
	password: 'Kenny061256',
	database: 'delivery_food'
});

const deliveryModel = {
	get_user: (cb) => {
		pool.getConnection()
			.then(conn => {
				conn.query('select user.* from user left join delivery_person on user.s_num = delivery_person.ur_s_num where user.identity="d" and delivery_person.ur_s_num IS NULL')
					.then(results => {
						//if (err) return cb(err);
						conn.release();
						//console.log(results);
						cb(null,results);
					})
			})
			.catch(error => {
				console.error(error);
			});
	},
	all: (cb) => {
		pool.getConnection()
			.then(conn => {
				conn.query('select * from delivery_person')
					.then(results => {
						//if (err) return cb(err);
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
				conn.query('select delivery_person.*,user.user from delivery_person,user where delivery_person.s_num=? and delivery_person.ur_s_num=user.s_num', [id])
					.then(results => {
						//if (err) return cb(err);
						conn.release()
						cb(null,results);
					})
			})
			.catch(error => {
				console.error(error);
			});
	},
	create: (data,filePath,cb) => {
		const {ur_s_num,dp_nickname,dp_reason,dp01,dp02,dp_experience} = data;
		console.log(filePath);
		pool.getConnection()
			.then(conn => {
				console.log(filePath);
				const values = [
					ur_s_num,
					dp_nickname || null,
					filePath,
					dp_reason || null,
					dp01,
					dp02,
					dp_experience || null
				];
				conn.query('insert into delivery_person set ur_s_num=?,dp_nickname=?,dp_img=?,dp_reason=?,dp01=?,dp02=?,dp_experience=?;',values)
					.then(() => {
						conn.release();
						cb(null);
					})
			})
			.catch(error => {
				console.error(error);
			});
	},
	update: (id,data,filePath,cb) => {
		const {dp_nickname,dp_reason,dp01,dp02,dp_experience} = data;
		console.log(filePath);	
		pool.getConnection()
			.then(conn => {
				if (filePath === "") {
					const values = [
						dp_nickname || null,
						dp_reason || null,
						dp01,
						dp02,
						dp_experience || null,
						id
					];
					conn.query('update delivery_person set dp_nickname=?,dp_img=dp_img,dp_reason=?,dp01=?,dp02=?,dp_experience=? where s_num=?;',values)
						.then(() => {
							conn.release();
							cb(null);
						})
				} else {
					const values = [
						dp_nickname || null,
						filePath || null,
						dp_reason || null,
						dp01,
						dp02,
						dp_experience || null,
						id
					];
					conn.query('update delivery_person set dp_nickname=?,dp_img=?,dp_reason=?,dp01=?,dp02=?,dp_experience=? where s_num=?;',values)
						.then(() => {
							conn.release();
							cb(null);
						})
				}
			})
			.catch(error => {
				console.error(error);
			});
	},
	delete: (id,cb) => {	
		pool.getConnection()
			.then(conn => {
				conn.query('delete from delivery_person where s_num = ?',[id])
					.then(() => {
						conn.release();
						cb(null);
					})
			})
			.catch(error => {
				console.error(error);
			});
	}
}

module.exports = deliveryModel
