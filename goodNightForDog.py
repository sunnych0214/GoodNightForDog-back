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
startdate = "20200101"
# startdate = "20190805"
enddate = datetime.today().strftime("%Y%m%d")



# 전체 개수 가져오기
url = 'http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?serviceKey='+apiKey+'&bgnde='+startdate+'&endde='+enddate+'&upkind=417000&kind=&upr_cd=&org_cd=&care_reg_no=&state=null&pageNo=1&numOfRows=1&neuter_yn=&'
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
        
        url = 'http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?serviceKey='+apiKey+'&bgnde='+startdate+'&endde='+enddate+'&upkind=417000&kind=&upr_cd=&org_cd=&care_reg_no=&state=null&pageNo='+str(i)+'&numOfRows=1000&neuter_yn=&'


        i = i-1
        print(i)

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

                if(w_data['desertionNo'] is None):
                    desertionNo = ""
                else:
                    desertionNo = w_data['desertionNo']

                if(w_data['noticeNo'] is None):
                        noticeNo = ""
                else:
                    noticeNo = w_data['noticeNo']

                if(w_data['processState'] is None):
                        processState = ""
                else:
                    processState = w_data['processState']

                if(w_data['sexCd'] is None):
                        sexCd = ""
                else:
                    sexCd = w_data['sexCd']

                if(w_data['noticeSdt'] is None):
                        noticeSdt = ""
                else:
                    noticeSdt = w_data['noticeSdt']

                if(w_data['popfile'] is None):
                        popfile = ""
                else:
                    popfile = w_data['popfile']

                if(w_data['colorCd'] is None):
                        colorCd = ""
                else:
                    colorCd = w_data['colorCd']

                if(w_data['age'] is None):
                        age = ""
                else:
                    age = w_data['age']

                if(w_data['weight'] is None):
                        weight = ""
                else:
                    weight = w_data['weight']

                if(w_data['neuterYn'] is None):
                        neuterYn = ""
                else:
                    neuterYn = w_data['neuterYn']

                if(w_data['specialMark'] is None):
                        specialMark = ""
                else:
                    specialMark = w_data['specialMark']

                if(w_data['careNm'] is None):
                        careNm = ""
                else:
                    careNm = w_data['careNm']

                if(w_data['careTel'] is None):
                        careTel = ""
                else:
                    careTel = w_data['careTel']

                if(w_data['careAddr'] is None):
                        careAddr = ""
                else:
                    careAddr = w_data['careAddr']

                if(w_data['orgNm'] is None):
                        orgNm = ""
                else:
                    orgNm = w_data['orgNm']

                if(w_data['happenPlace'] is None):
                        happenPlace = ""
                else:
                    happenPlace = w_data['happenPlace']

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


