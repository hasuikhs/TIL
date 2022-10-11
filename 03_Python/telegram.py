"""
'https://api.telegram.org/bot979730092:AAEFIhVOVVnZE-3IfQVQ_nZLchSP_AeA0DE/getMe'
"""

import requests

# (1) getUpdates을 통해 chat_id를 가져옴
response = requests.get('https://api.telegram.org/bot<telegram chatbot key>/getUpdates')
res_dict = response.json()
chat_id = str(res_dict['result'][0]['message']['chat']['id'])

# (2) url을 조합하여 request로 요청 보내기
token = 'bot<telegram chatbot key'
base_url = 'http://api.telegram.org/'
method = '/sendMessage?chat_id='
msg = '&text=' + '갔냐?'

url = base_url + token + method + chat_id + msg
print(url)
requests.get(url)
