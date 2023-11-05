# 每日送餐總表
import mysql.connector
import datetime

try:
    conn = mysql.connector.connect(
            user = "kenny",
            password = "Kenny061256",
            host = "localhost",
            port = 3306,
            database = "delivery_food"
    )
except:
    print("connect error")
    exit(1)

cur = conn.cursor()

date = datetime.date.today()

# 所有案主
sql = "select * from clients;"
cur.execute(sql,)
clients = cur.fetchall()
# 案主路線
sql = "select * from clients_route;"
cur.execute(sql,)
clients_route = cur.fetchall()
# 所有路線
sql = "select * from route;"
cur.execute(sql,)
route = cur.fetchall()
# 所有便當
sql = "select bento.s_num,bento.bo_name,sum(a.price) from bento,(select bento_dishes.bo_s_num,dishes.price from bento_dishes,dishes where bento_dishes.ds_s_num=dishes.s_num) as a where bento.s_num = a.bo_s_num group by s_num;"
cur.execute(sql,)
bento = cur.fetchall()
# 訂單順序(先寫死)
order = [1,1,1]
# 送餐員編號(先寫死)
dp = [6,12,13]
# 新增送餐總表
for i in range(len(clients)):
    for j in range(len(clients_route)):
        if clients[i][0] == clients_route[j][1]:
                ct_s_num = clients[i][0] # 案主編號
                ct_name = clients[i][2]+clients[i][1] # 案主姓名
                bo_s_num = clients[i][8]; # 便當編號
                for k in range(len(route)):
                    if clients_route[j][3] == route[k][0]:
                        reh_s_num = route[k][0] # 路線編號
                        reh_name = route[k][1] # 路線名稱
                        price = 0
                        for l in range(len(bento)):
                            if bento[l][0] == 17:
                                price = bento[l][2]
                        dp_s_num = dp[reh_s_num-1]
                        ct_order = order[reh_s_num-1]
                        order[reh_s_num-1] = order[reh_s_num-1]+1
                        # 送餐員編號, 案主編號, 路線編號, 案主姓名, 日期, 便當編號, 路線名稱, 訂單順序, 便當價錢
                        sql = "insert into daily_shipment(dp_s_num,ct_s_num,reh_s_num,ct_name,date,bo_s_num,reh_name,ct_order,price)values(%s,%s,%s,%s,%s,%s,%s,%s,%s);"
                        cur.execute(sql,(dp_s_num,ct_s_num,reh_s_num,ct_name,date,bo_s_num,reh_name,ct_order,price))
conn.commit()
conn.close()
