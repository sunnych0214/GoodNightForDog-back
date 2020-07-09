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
sql = "DELETE FROM dogs"
curs.execute(sql)

sql = "DELETE FROM doginfos"
curs.execute(sql)

sql = "ALTER TABLE dogs AUTO_INCREMENT = 1"
curs.execute(sql)	

sql = "ALTER TABLE doginfos AUTO_INCREMENT = 1"
curs.execute(sql)	

conn.commit()

apiKey = 'knUQdakM6%2FdRgDZqzOSWBqFGp%2FIRvc%2F7aTAbkAP5%2FBjozhkwwnto9gzkcJ2aVvgj7id2m%2BhxNt3rXWUCfumhlw%3D%3D'
today = datetime.today().strftime("%Y%m%d")



# 전체 개수 가져오기
url = 'http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?serviceKey='+apiKey+'&bgnde=20200701&endde='+today+'&upkind=417000&kind=&upr_cd=&org_cd=&care_reg_no=&state=null&pageNo=1&numOfRows=1&neuter_yn=&'
request = ul.Request(url)
response = ul.urlopen(request)
rescode = response.getcode()

if(rescode == 200):
    responseData = response.read()
    rD = xmltodict.parse(responseData)
    rDJ = json.dumps(rD)
    rDD = json.loads(rDJ)

    totalCount = rDD["response"]["body"]["totalCount"]

    i = int(int(totalCount)/100) +1
    
    while i >= 1:
        
        url = 'http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?serviceKey='+apiKey+'&bgnde=20200701&endde='+today+'&upkind=417000&kind=&upr_cd=&org_cd=&care_reg_no=&state=null&pageNo='+str(i)+'&numOfRows=100&neuter_yn=&'


        i = i-1

        request = ul.Request(url)
        response = ul.urlopen(request)
        rescode = response.getcode()

        if(rescode == 200):
            responseData = response.read()
            rD = xmltodict.parse(responseData)
            rDJ = json.dumps(rD)
            rDD = json.loads(rDJ)

            # print(url)

            w_data = rDD["response"]["body"]["items"]["item"]
            

            for w_data in w_data : 

                sql = "INSERT INTO dogs (   desertion_no, notice_no,  process_state, sex_cd, notice_sdt, img, state, create_dt  ) values (%s, %s, %s, %s, %s, %s, 7, NOW())"
                curs.execute(sql, (w_data['desertionNo'] ,w_data["noticeNo"], w_data["processState"], w_data["sexCd"], w_data["noticeSdt"], w_data["popfile"]))
                conn.commit()

                dog_id = curs.lastrowid

                sql = "INSERT INTO doginfos (  color_cd, age,  weight, notice_comment, neuter_yn, special_mark, care_nm, care_tel, care_addr, org_nm, change_nm, officetel, happen_place, inoculation_status, euthanasia_date, dog_id, create_dt ) values (%s, %s, %s, NULL, %s, %s,  %s, %s, %s, %s, NULL, NULL, %s, NULL, NULL, %s,NOW())"
                curs.execute(sql, (w_data['colorCd'] ,w_data["age"], w_data["weight"], w_data["neuterYn"], w_data["specialMark"], w_data["careNm"], w_data["careTel"], w_data["careAddr"], w_data["orgNm"], w_data["happenPlace"], dog_id))
                conn.commit()




        
    
    # w_data = rDD["response"]["body"]["items"]["item"]

#     for w_data in w_data : 
#         # print('age :'+w_data["age"])
#         # print('careAddr :'+w_data["careAddr"])
#         # print('careNm :'+w_data["careNm"])
#         # print('careTel :'+w_data["careTel"])
#         # print('chargeNm :'+w_data["chargeNm"])
#         # print('colorCd :'+w_data["colorCd"])
#         # print('filename :'+w_data["filename"])
#         # print('happenDt :'+w_data["happenDt"])
#         # print('happenPlace :'+w_data["happenPlace"])
#         # print('kindCd :'+w_data["kindCd"])
#         # print('neuterYn :'+w_data["neuterYn"])
#         # print('noticeEdt :'+w_data["noticeEdt"])
#         # print('noticeNo :'+w_data["noticeNo"])
#         # print('noticeSdt :'+w_data["noticeSdt"])
#         # print('officetel :'+w_data["officetel"])
#         # print('orgNm :'+w_data["orgNm"])
#         # print('popfile :'+w_data["popfile"])
#         # print('processState :'+w_data["processState"])
#         # print('sexCd :'+w_data["sexCd"])
#         # print('specialMark :'+w_data["specialMark"])
#         # print('weight :'+w_data["weight"])

#         curs = conn.cursor()
        
#         # 유기번호 desertionNo
#         # 공고번호 noticeNo
#         # 공고시작일 noticeSdt
#         # 상태 processState
#         # 성별 sexCd
#         # 유기견 사진 popfile
#         # 작성일


#         sql = "INSERT INTO dogs (   desertion_no, notice_no,  process_state, sex_cd, notice_sdt, img, state, create_dt  ) values (%s, %s, %s, %s, %s, %s, 7, NOW())"
#         curs.execute(sql, (w_data['desertionNo'] ,w_data["noticeNo"], w_data["processState"], w_data["sexCd"], w_data["noticeSdt"], w_data["popfile"]))
#         conn.commit()
#         # print(w_data['desertionNo'])
#         # print(w_data['noticeNo'])
#         # print(w_data['processState'])
#         # print(w_data['sexCd'])
#         # print(w_data['noticeSdt'])
#         # print(w_data['popfile'])
#         # print(w_data['processState'])






    # w_data = rDD["response"]["body"]["items"]["item"]

#     for w_data in w_data : 

#         curs = conn.cursor()

#         sql = "INSERT INTO dogs (   desertion_no, notice_no,  process_state, sex_cd, notice_sdt, img, state, create_dt  ) values (%s, %s, %s, %s, %s, %s, 7, NOW())"
#         curs.execute(sql, (w_data['desertionNo'] ,w_data["noticeNo"], w_data["processState"], w_data["sexCd"], w_data["noticeSdt"], w_data["popfile"]))
#         conn.commit()


