const express = require("express");
const app = express();
const bodyParser = require('body-parser'); // 解析封包
const cookieParser = require('cookie-parser'); // 解析cookie
const server = require('http').Server(app); // socket
const io = require('socket.io')(server);
const multer = require('multer')
const upload = multer({dest: __dirname+'/tempImg'});
const fs = require('fs')
// 跨域
const cors = require('cors');
const corsOptions = {
	"origin": "*", // 允許的來源
	"methods": "GET"
};
app.use(cors(corsOptions));
// socket
io.on('connection', (socket) => {
	console.log('Client connected');
	// 監聽斷開連線事件
	socket.on('disconnect', () => {
		console.log('Client disconnected');
	});
});

// 用 bodyParser 來解析封包
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

// 圖片讀取目錄
app.use(express.static(__dirname+'/img'));

const port = 3000;

// 導入 controller
const clientController = require('./controllers/client');
const loginController = require('./controllers/login');
const appController = require('./controllers/app_controller');
const chatGPTController = require('./controllers/chatGPT')
const routeController = require('./controllers/route');
const deliveryController = require('./controllers/delivery');
const foodController = require('./controllers/food');
const bentoController = require('./controllers/bento');
const reportController = require('./controllers/report');
const healthController = require('./controllers/health');
const carbonController = require('./controllers/carbon');
const punchController = require('./controllers/punch');
const opinionController = require('./controllers/opinion');
const analysisController = require('./controllers/analysis');

app.set('view engine', 'ejs');

// app (Xamarin) api
app.post("/account/login", upload.any(), appController.login);
app.post("/dp/get_daily_shipment", appController.shipment);
app.post("/account/save_worklog", upload.single('img'), appController.client_health);
// chatGPT api
app.get("/chatGPT/food_all", chatGPTController.food_all);
app.post("/chatGPT/food_detail", chatGPTController.food_detail);
app.get("/chatGPT/food_name", chatGPTController.food_name);
app.get("/chatGPT/function", chatGPTController.function_all);
app.post("/chatGPT/opinion", chatGPTController.opinion);
app.get("/chatGPT/bento", chatGPTController.bento_all);
// 地圖系統
app.post("/map/carbon", carbonController.get_carbon);
app.post("/map/punch", punchController.get_punch);
app.post("/map/analysis", analysisController.get_analysis);
// 管理客戶
// api
app.get("/api/client", clientController.api_all); // 要全部客戶資料
app.get("/api/client/:id", clientController.api_detail); // 要客戶詳細資料
// 頁面
app.get("/client", clientController.all); // 全部客戶頁面
app.get("/client/create", clientController.create); // 新增客戶頁面
app.post("/client/create", (req,res) => { // 新增客戶
	clientController.create(req,res);
});
app.get("/client/detail/:id", clientController.detail); // 客戶詳細資料頁面
app.get("/client/update/:id", clientController.update); // 更新客戶頁面
app.put("/client/update/:id", (req,res) => { // 更新客戶
	clientController.update(req,res);
});

app.delete("/client/delete/:id", (req,res) => { // 刪除客戶
	clientController.delete(req,res);
});

// 註冊登入首頁登出
// api

// 頁面
app.get("/regist",loginController.regist);
app.post("/regist",loginController.regist);
app.get("/login",loginController.login);
app.post("/login",loginController.login);
app.get("/main",loginController.main);
app.get("/logout",loginController.logout);

// 管理路線
// api
app.get("/api/route",routeController.api_all);
app.get("/api/route/:id",routeController.api_detail);

// 頁面
app.get("/route",routeController.all);
app.get("/route/create", routeController.create); // 新增路線頁面
app.post("/route/create", (req,res) => { // 新增路線
	routeController.create(req,res);
});
app.get("/route/detail/:id", routeController.detail); // 路線詳細資料頁面
app.get("/route/update/:id", routeController.update); // 更新路線頁面
app.put("/route/update/:id", (req,res) => { // 更新路線
	routeController.update(req,res);
});

app.delete("/route/delete/:id", (req,res) => { // 刪除路線
	routeController.delete(req,res);
});

// 管理送餐員
// api
app.get("/api/delivery",deliveryController.api_all);
app.get("/api/delivery/:id",deliveryController.api_detail);
app.get("/api/delivery_create",deliveryController.api_create); // 列出可新增的送餐員

// 頁面
app.get("/delivery",deliveryController.all);
app.get("/delivery/create", deliveryController.create); // 新增送餐員頁面
app.post("/delivery/create", upload.single('dp_img'), (req,res) => { // 新增送餐員
	deliveryController.create(req,res);
});
app.get("/delivery/detail/:id", deliveryController.detail); // 送餐員詳細資料頁面
app.get("/delivery/update/:id", deliveryController.update); // 更新送餐員頁面
app.put("/delivery/update/:id", upload.single('dp_img'), (req,res) => { // 更新送餐員
	deliveryController.update(req,res);
});

app.delete("/delivery/delete/:id", (req,res) => { // 刪除送餐員
	deliveryController.delete(req,res);
});

// 管理菜色
// api
app.get("/api/food",foodController.api_all);
app.get("/api/food/:id",foodController.api_detail);

// 頁面
app.get("/food",foodController.all);
app.get("/food/create", foodController.create); // 新增菜色頁面
app.post("/food/create", (req,res) => { // 新增菜色
	foodController.create(req,res);
});
app.get("/food/detail/:id", foodController.detail); // 菜色詳細資料頁面
app.get("/food/update/:id", foodController.update); // 更新菜色頁面
app.put("/food/update/:id", (req,res) => { // 更新菜色
	foodController.update(req,res);
});

app.delete("/food/delete/:id", (req,res) => { // 刪除菜色
	foodController.delete(req,res);
});

// 管理便當
// api
app.get("/api/bento",bentoController.api_all);
app.get("/api/bento/:id",bentoController.api_detail);
app.get("/api/bento_create",bentoController.api_create); // 列出可選的菜色

// 頁面
app.get("/bento",bentoController.all);
app.get("/bento/create", bentoController.create); // 新增便當頁面
app.post("/bento/create", (req,res) => { // 新增便當
	bentoController.create(req,res);
});
app.get("/bento/detail/:id", bentoController.detail); // 便當詳細資料頁面
app.get("/bento/update/:id", bentoController.update); // 更新便當頁面
app.put("/bento/update/:id", (req,res) => { // 更新便當
	bentoController.update(req,res);
});

app.delete("/bento/delete/:id", (req,res) => { // 刪除便當
	bentoController.delete(req,res);
});

// 管理報表
// 頁面
app.get("/report", reportController.page);
// api
app.get("/report/day", reportController.day);
app.get("/report/month", reportController.month);

// 長者健康記錄
// 頁面
app.get("/health", healthController.all);
app.get("/health/detail/:id/:date", healthController.detail)
// api
app.get("/api/health", healthController.api_all);
app.get("/api/health/:id/:date", healthController.api_detail);

// 碳排放報表
// 頁面
app.get("/carbon", carbonController.page);
// api
app.get("/carbon/month", carbonController.month);

// 簽到簽退記錄
// api
app.get("/api/punch",punchController.api_all);
// 頁面
app.get("/punch",punchController.page);

// 使用者意見回饋
// api
app.get("/api/opinion",opinionController.api_all);
// 頁面
app.get("/opinion",opinionController.page);

// 停留時間分析
// api
app.get("/api/analysis",analysisController.api_all);
app.get("/analysis/month", analysisController.month);
// 頁面
app.get("/analysis",analysisController.page);
//app.listen(port,(req,res) => {});`
server.listen(5000,(req,res) => {});
