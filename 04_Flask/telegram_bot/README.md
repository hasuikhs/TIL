## Telegram Bot

### 1. 시작

- Flask를 이용한 간단한 Telegram Bot을 만들어 보자.

```python
# app.py
from flask import Flask, render_template, request
from decouple import config
import random
import requests

app = Flask(__name__)

api_url = 'https://api.telegram.org'
token = config('TELEGRAM_BOT_TOKEN')
chat_id = config('CHAT_ID')

@app.route('/')
def hello_world():
    return "hello world"
```

```python
<!-- app.py -->
...
if __name__ == '__main__':
    app.run(debug=True)
```

- 위 코드를 app.py 하단에 삽입하면 서버를 간단한게 실행 가능하다.

```bash
student@M150123 MINGW64 ~/Desktop/TIL/04_Flask/telegram_bot (master)
$ python app.py
```

### 2. Telegram Bot 연결하기

```python
# 텔레그램 서버가 우리 서버에게 HTTP POST 요청을 통해,
# 사용자 메시지 정보를 받아라고 전달해주는 것
# 우리가 status 200을 리턴해줘야 텔레그램 측이 더 이상의 전송을 중단한다.
# 200을 돌려주지 않으면 계속~~~ POST 요청을 여러번 보낸다.
@app.route(f'/{token}', methods=['POST'])
def telegram():
    # 1. 메아리(Echo) 기능
    # 1.1 request.get_json 구조 확인하기
    print(request.get_json())
    
    # 1.2 사용자 아이디, 텍스트 가져오기
    chat_id = request.get_json().get('message').get('from').get('id')
    text = request.get_json().get('message').get('text')  

    # 1. [기본] 로또 기능
    #    사용자가 '/로또라고 말하면 랜덤으로 번호 6개 뽑아서 돌려주기
    #    나머지 경우엔 전부 메아리 칩시다
    # 2. [심화] vonvon 기능
    #    사용자가 '/vonvon 이름'이라고 말하면 신이 나를 만들었을 때 요소 돌려주기!
	
    # "/로또"라고 들어오면 로또 번호를 대답해준다.
    if text == "/로또":
        requests.get(f'{api_url}/bot{token}/sendMessage?chat_id={chat_id}&text={random.sample(range(1, 46), 6)}')
    
    # "/vonvon 이름"이 들어오면 vonvon에 대한 대답을 해준다.
    elif '/vonvon' in text[0:7]:
        name = text.split()[1]
        user_name = name
        # 1. 사용자가 입력한 데이터를 가져온다.
        # 2. 사용자에게 보여줄 여러가지 재밌는 특성들 리스트를 만든다.
        first_list = ['잘생김', '못생김', '많이 못생김', '많이 잘생김', '그냥 존잘러']
        second_list = ['자신감', '귀찮음', '쑥스러움', '열정적임', '귀찮음']
        third_list = ['허세', '물욕', '식욕', '똘기']
        # 3. 리스트에서 랜덤으로 하나씩을 선택한다.
        first = random.choice(first_list)
        second = random.choice(second_list)
        third = random.choice(third_list)
        text = user_name + "를 신이 만들때 " + first + " 한 스푼, " +  second + " 한 스푼, " + third + " 왕창" 
        requests.get(f'{api_url}/bot{token}/sendMessage?chat_id={chat_id}&text={text}')
    # 정해진 단어가 들어오지 않는다면 들어온 매시지를 메아리친다.
    else:
        requests.get(f'{api_url}/bot{token}/sendMessage?chat_id={chatid}&text={text}')
    return '', 200
```