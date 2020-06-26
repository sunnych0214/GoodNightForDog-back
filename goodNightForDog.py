import urllib.request as ul
import xmltodict
import json
import sys
import io
import pymysql.cursors
import pandas as pd

conn = pymysql.connect( host="localhost",
                              user= "root",
                              password="sandoll1234",
                              db="goodnightfordog",
                              charset = "utf8")

apiKey = 'v7Fwp3M76NO8Kl85LtI169F9X7d2YAt7VOKyr1PjOEdEDB8vsJ%2BuJT9XWKRuGwDQU6aq8M1qDDGphbaPwmozMg%3D%3D'
string = ''

url = 'http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc/abandonmentPublic?serviceKey=v7Fwp3M76NO8Kl85LtI169F9X7d2YAt7VOKyr1PjOEdEDB8vsJ%2BuJT9XWKRuGwDQU6aq8M1qDDGphbaPwmozMg%3D%3D&bgnde=&endde=20200624&upkind=417000&kind=&upr_cd=&org_cd=&care_reg_no=&state=null&pageNo=1&numOfRows=10&neuter_yn=&'

request = ul.Request(url)skgotrjscas

response = ul.urlopen(request)

rescode = response.getcode()

if(rescode == 200):
    responseData = response.read()
    rD = xmltodict.parse(responseData)
    rDJ = json.dumps(rD)
    rDD = json.loads(rDJ)

    # print(rDD)

    w_data = rDD["response"]["body"]["items"]["item"]

    for w_data in w_data : 
        # print('age :'+w_data["age"])
        # print('careAddr :'+w_data["careAddr"])
        # print('careNm :'+w_data["careNm"])
        # print('careTel :'+w_data["careTel"])
        # print('chargeNm :'+w_data["chargeNm"])
        # print('colorCd :'+w_data["colorCd"])
        # print('filename :'+w_data["filename"])
        # print('happenDt :'+w_data["happenDt"])
        # print('happenPlace :'+w_data["happenPlace"])
        # print('kindCd :'+w_data["kindCd"])
        # print('neuterYn :'+w_data["neuterYn"])
        # print('noticeEdt :'+w_data["noticeEdt"])
        # print('noticeNo :'+w_data["noticeNo"])
        # print('noticeSdt :'+w_data["noticeSdt"])
        # print('officetel :'+w_data["officetel"])
        # print('orgNm :'+w_data["orgNm"])
        # print('popfile :'+w_data["popfile"])
        # print('processState :'+w_data["processState"])
        # print('sexCd :'+w_data["sexCd"])
        # print('specialMark :'+w_data["specialMark"])
        # print('weight :'+w_data["weight"])

        curs = conn.cursor()
        
        # 유기번호 desertionNo
        # 공고번호 noticeNo
        # 공고시작일 noticeSdt
        # 상태 processState
        # 성별 sexCd
        # 유기견 사진 popfile
        # 작성일


        sql = "INSERT INTO dogs (   desertion_no, notice_no,  process_state, sex_cd, notice_sdt, img, state, create_dt  ) values (%s, %s, %s, %s, %s, %s, 7, NOW())"
        curs.execute(sql, (w_data['desertionNo'] ,w_data["noticeNo"], w_data["processState"], w_data["sexCd"], w_data["noticeSdt"], w_data["popfile"]))
        conn.commit()
        # print(w_data['desertionNo'])
        # print(w_data['noticeNo'])
        # print(w_data['processState'])
        # print(w_data['sexCd'])
        # print(w_data['noticeSdt'])
        # print(w_data['popfile'])
        # print(w_data['processState'])


