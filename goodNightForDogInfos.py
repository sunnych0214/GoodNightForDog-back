import urllib.request as ul
import xmltodict
import json
import sys
import io
import pymysql.cursors
import pandas as pd
from datetime import datetime

conn = pymysql.connect( host="localhost",
                              user= "root",
                              password="sandoll1234",
                              db="goodnightfordog",
                              charset = "utf8")

curs = conn.cursor()

# DB 초기화
sql = "DELETE FROM doginfos"
curs.execute(sql)

sql = "ALTER TABLE doginfos AUTO_INCREMENT = 1"
curs.execute(sql)	

conn.commit()

apiKey = 'knUQdakM6%2FdRgDZqzOSWBqFGp%2FIRvc%2F7aTAbkAP5%2FBjozhkwwnto9gzkcJ2aVvgj7id2m%2BhxNt3rXWUCfumhlw%3D%3D'
today = datetime.today().strftime("%Y%m%d")



# 전체 개수 가져오기
url = 'http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?serviceKey='+apiKey+'&bgnde=20200301&endde='+today+'&upkind=417000&kind=&upr_cd=&org_cd=&care_reg_no=&state=null&pageNo=1&numOfRows=1&neuter_yn=&'
request = ul.Request(url)
response = ul.urlopen(request)
rescode = response.getcode()

if(rescode == 200):
    responseData = response.read()
    rD = xmltodict.parse(responseData)
    rDJ = json.dumps(rD)
    rDD = json.loads(rDJ)

    totalCount = rDD["response"]["body"]["totalCount"]

    i = int(int(totalCount)/1000) +1
    while i >= 1:
        
        print(i)
        i = i-1

        url = 'http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?serviceKey='+apiKey+'&bgnde=20200601&endde='+today+'&upkind=417000&kind=&upr_cd=&org_cd=&care_reg_no=&state=null&pageNo='+str(i)+'&numOfRows=1000&neuter_yn=&'

        request = ul.Request(url)
        response = ul.urlopen(request)
        rescode = response.getcode()

        if(rescode == 200):
            responseData = response.read()
            rD = xmltodict.parse(responseData)
            rDJ = json.dumps(rD)
            rDD = json.loads(rDJ)

            w_data = rDD["response"]["body"]["items"]["item"]

            for w_data in w_data : 

                curs = conn.cursor()

                sql = "INSERT INTO dogs (   desertion_no, notice_no,  process_state, sex_cd, notice_sdt, img, state, create_dt  ) values (%s, %s, %s, %s, %s, %s, 7, NOW())"
                curs.execute(sql, (w_data['desertionNo'] ,w_data["noticeNo"], w_data["processState"], w_data["sexCd"], w_data["noticeSdt"], w_data["popfile"]))
                conn.commit()

                print(curs.lastrowid+" : 아이디")
