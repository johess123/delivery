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

#date = datetime.date.today()
#print(date);
sql = "select * from daily_shipment where date='2023-07-31';"
cur.execute(sql,)
records = cur.fetchall()
for i in range(len(records)):
    print(records[i][5])
    sql = "insert into monthly_report(date,price,ct_s_num)values(%s,%s,%s);"
    cur.execute(sql,('2023-07-31',records[i][2],records[i][9]))
conn.commit()
conn.close()
