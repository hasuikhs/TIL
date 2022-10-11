from flask import Flask
import random
import requests
app = Flask(__name__)

@app.route('/')
def home():
    return 'hello'

# 1. 주문서를 만들고,
# 2. 해당 주문이 들어왔을 때 무엇을 할지 정의
@app.route('/name')
def name():
    return '김한석'

@app.route('/hello/<name>')
def hello(name):
    return f'hello {name}'

# Flask는 문자열로 return해야 함
# <> 안에서 int: 를 붙이면 바로 형변환이 가능
@app.route('/square/<int:num>')
def square(num):
    return str(num ** 2)

@app.route('/menu')
def menu():
    foods = ['바스버거', '대우식당', '진가와', '고갯마루']
    return random.choice(foods)

@app.route('/lotto')
def lotto():
    # winner = [3, 5, 12, 13, 33, 39]
    url = 'https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=873'
    response = requests.get(url)
    res_dict = response.json()

    winner = []

    winner.append(res_dict['drwtNo1'])
    winner.append(res_dict['drwtNo2'])
    winner.append(res_dict['drwtNo3'])
    winner.append(res_dict['drwtNo4'])
    winner.append(res_dict['drwtNo5'])
    winner.append(res_dict['drwtNo6'])
    result = random.sample(range(1, 46), 6)
    
    # for num in result:
    #     if num in winner:
    #         cnt += 1
    cnt = len(set(winner) & set(result))

    rank = "꽝"        
    if (cnt == 6):
        rank = "1등"
    elif (cnt == 5):
        rank = "3등"
    elif (cnt == 4):
        rank = "4등"
    elif (cnt == 3):
        rank = "5등"
    

    return str(sorted(result)) + rank