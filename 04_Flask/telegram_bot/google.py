import requests

api_url="https://translation.googleapis.com/language/translate/v2"
key = "< Google 번역 api 키 >"
data = {
    "q" : "번역이 하고싶어요 선생님",
    "source" :"ko",
    "target" : "en"
}

result = requests.post(f'{api_url}?key={key}', data).json()
print(result)
# => {'data': {'translations':[{'translatedText' : }]}}