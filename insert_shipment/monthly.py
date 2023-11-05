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
month = int(date.strftime("%Y-%m-%d")[5:7])-1
if month <= 0:
    month = 12
print(month)
sql = "select * from daily_shipment where month(date)=%s;"
cur.execute(sql,(month,))
records = cur.fetchall()
for i in range(len(records)):
    sql = "insert into monthly_report(date,price,ct_s_num)values(%s,%s,%s);"
    cur.execute(sql,(records[i][5],records[i][2],records[i][9]))
conn.commit()

conn.close()
