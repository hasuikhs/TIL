from django.shortcuts import render
import random
import requests

# Create your views here.
def index(request):
    return render(request, 'pages/index.html')

# 정보를 던져줄 페이지
def throw(request):
    return render(request, 'pages/throw.html')

# 사용자로부터 정보를 받아서 다시 던져줄 페이지
def catch(request):
    message = request.GET.get('message')
    context = { 'message' : message }
    return render(request, 'pages/catch.html', context)

# 아스키 아티 ASCII ARTII
# 사용자로부터 텍스트 입력받는 페이지
def input_text(request):
    return render(request, 'pages/input_text.html')

# 텍스트 받아서 아트로 보여주는 페이지
def result(request):
    text = request.GET.get('text')
    context = { 'text' : text }
    return render(request, 'pages/result.html', context)

def art(request):
    return render(request, 'pages/art.html')

def result2(request):
    print(request.GET)
    # 1. form 태그로 날린 데이터를 받는다. (GET 방식)
    word = request.GET.get('word')

    # 2. ARTII api로 요청을 보내 응답 결과를 text로 fonts에 저장한다.
    fonts = requests.get('http://artii.herokuapp.com/fonts_list').text
    # fonts --> str

    # 3. fonts(str)를 fonts(list)로 바꾼다.
    fonts = fonts.split('\n')
    
    # 4. fonts(list)안에 들어있는 요소중 하나를 선택해서 font라는 변수에 저장한다.
    font = random.choice(fonts)

    # 5. 위에서 우리가 만든 word와 font를 가지고 다시 요청을 보내 응답 결과를 result에 저장
    result = requests.get(f'http://artii.herokuapp.com/make?text={word}&font={font}').text

    context = {'result': result}
    return render(request, 'pages/result2.html', context)

# 회원가입 폼을 보여주는 페이지
def user_new(request):
    return render(request, 'pages/user_new.html')

# 회원가입 요청을 처리하는 페이지(로직)
# 실제로는 이렇게 구현하지 않는다. 이건 저세상 코드
def user_create(request):

    user_id = request.POST.get('user_id')
    pwd = request.POST.get('pwd')
    context = {
        'user_id' : user_id,
        'pwd' : pwd,
    }
    return render(request, 'pages/user_create.html', context)

def static_sample(request):
    return render(request, 'pages/static_sample.html')