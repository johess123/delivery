// 導入 model 裡的 todo
const clientModel = require("../models/client")

const clientController = {
	client: (req,res) => {
		clientModel.getAll((err,results) => {
			if (err) return console.log(err);
			res.render('allClient',{
				client: results
			})
		})
	},

	/*get: (req,res) => {
		const id = req.params.id
		todoModel.get(id, (err,results) => {
			if (err) return console.log(err);
			res.render('todo', {
				todo: results[0]
			})
		})
	}*/
}

module.exports = clientController
