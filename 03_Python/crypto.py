import requests

url = 'https://api.bithumb.com/public/ticker/btc'
response = requests.get(url)
res_dict = response.json()

print(res_dict['data']['opening_price'])