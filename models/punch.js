const db = require('mariadb');
const pool = db.createPool({
	host: 'localhost',
	user: 'kenny',
	password: 'Kenny061256',
	database: 'delivery_food'
});
const punchModel = {
	all: (cb) => {	
		pool.getConnection()
			.then(conn => {
				conn.query('select r.reh_name,c.ct_time,concat(d.dp01,d.dp02)dp_name,concat(c.ct_lastname,c.ct_name)ct_name,b.bo_name,p.ph_time,p.ph_inorout,p.ph_wifi from punch p,clients c,route r,delivery_person d,bento b where p.ct_s_num=c.s_num and p.reh_s_num=r.s_num and p.dp_s_num=d.s_num and c.bo_s_num=b.s_num order by p.ph_time desc;')
					.then(results => {
						conn.release();
						cb(null,results);
					})
			})
			.catch(error => {
				console.error(error);
			});
	},
	record: (data,cb) => {
		values = [
			data["dp_s_num"],
			data["reh_s_num"],
			data["ph_time"],
			data["ph_inorout"],
			data["ph_lon"],
			data["ph_lat"],
			data["ph_wifi"],
			data["ct_s_num"]
		]
		pool.getConnection()
			.then(conn => {
				conn.query('insert into punch set dp_s_num=?,reh_s_num=?,ph_time=?,ph_inorout=?,ph_lon=?,ph_lat=?,ph_wifi=?,ct_s_num=?;',values)
					.then(() => {
						conn.release();
						cb(null);
					})
					.catch(error => {
						console.error(error);
					})
			})
			.catch(error => {
				console.error(error);
			});
	}
}

module.exports = punchModel
