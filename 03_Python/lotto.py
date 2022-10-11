"""
requests를 통해 동행복권 API 요청을 보내어,
1등 번호를 가져와 python list로 만듦
"""

import requests
import random

# 1. requests 통해 요청 보내기
url = 'https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=873'
response = requests.get(url)
res_dict = response.json()

winner = []

for i in range(1, 7):
    winner.append(res_dict[f'drwtNo{i}'])

result = random.sample(range(1, 46), 6)
    
# for num in result:
#     if num in winner:
#         cnt += 1
cnt = len(set(winner) & set(result))

rank = "bye"        
if (cnt == 6):
    rank = "1등"
elif (cnt == 5):
    rank = "3등"
elif (cnt == 4):
    rank = "4등"
elif (cnt == 3):
    rank = "5등"
    
print(str(sorted(result)) + rank)
