const db = require('mariadb');
const pool = db.createPool({
	host: 'localhost',
	user: 'kenny',
	password: 'Kenny061256',
	database: 'delivery_food'
});
const axios = require('axios');
const clientModel = {
	all: (cb) => {
		pool.getConnection()
			.then(conn => {
				conn.query('select * from clients')
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
				conn.query('select * from clients where s_num = ?', [id])
					.then(results => {
						conn.release();
						cb(null,results);
					})
			})
			.catch(error => {
				console.error(error);
			});
	},
	getPos: async (address) => {
		const url = 'https://maps.googleapis.com/maps/api/geocode/json';
		const params = {
			address: address,
			key: 'AIzaSyDAYkdUUunJll0Ds0s8DSUoOx0gnk5yIKc',
		};
		const response = await axios.get(url,{params});
		return response.data;
	},
	create: async (data,cb) => {
		const {name,last_name,gender,address,bento,time} = data;	
		const position = await clientModel.getPos(address)
		const longlat = position.results[0].geometry.location;
		const latitude = longlat.lat;
		const longitude = longlat.lng;
		const values = [
			name,
			last_name,
			gender,
			address,
			latitude,
			longitude,
			bento,
			time
		];
		pool.getConnection()
			.then(conn => {
				conn.query('insert into clients set ct_name=?,ct_lastname=?,ct_gender=?,ct_address=?,ct_lon=?,ct_lat=?,bo_s_num=?,ct_time=?;',values)
					.then(() => {
						conn.release();
						cb(null);
					})
			})
			.catch(error => {
				console.error(error);
			});
	},
	changeAddress: async (id,address) => { // 檢查住址是否更改
		try {
			const conn = await pool.getConnection();
			const results = await conn.query('select * from clients where s_num=? and ct_address=?;',[id,address])
			conn.release();
			return results;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
	update: async (id,data,cb) => {
		const {name,last_name,gender,address,bento,time} = data;
		const oldData = await clientModel.changeAddress(id,address);
		var latitdue;
		var longitude;
		if (oldData.length == 0) { // 若有更改要重新取得經緯度
			const position = await clientModel.getPos(address)
			const longlat = position.results[0].geometry.location;
			latitude = longlat.lat;
			longitude = longlat.lng;
		} else {
			latitude = oldData[0].ct_lat;
			longitude = oldData[0].ct_lon;
		}
		const values = [
			name,
			last_name,
			gender,
			address,
			longitude,
			latitude,
			bento,
			time,
			id
		];
		pool.getConnection()
			.then(conn => {
				conn.query('update clients set ct_name=?,ct_lastname=?,ct_gender=?,ct_address=?,ct_lon=?,ct_lat=?,bo_s_num=?,ct_time=? where s_num=?;',values)
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
				conn.query('delete from clients where s_num = ?',[id])
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

module.exports = clientModel
