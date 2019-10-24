# 1. 딕셔너리 만들기 (2가지)
lunch = {
    "중국집" : "032"
}
lunch = dict(중국집="032")

# 2. 딕셔너리 내용 추가하기
lunch['분식집'] = '031'

# 3. 딕셔너리 내용 가져오기 (2가지)
artists = {
    '아티스트': {
        '민수': '민수는 혼란스럽다',
        '아이유': '좋은날'
    }
}

# 4. 민수의 대표곡은?
print(artists["아티스트"]["민수"])
# => 민수는 혼란스럽다
print(artists.get("아티스트").get("민수"))
# => 민수는 혼란스럽다

# 1.4 딕셔너리 반복문 활용하기
# 1.4.1 기본 활용
for key in lunch:
    print(key)          # key 출력됨
    print(lunch[key])   # key로 value 추출
# => 중국집, 032
# => 분식집, 031

# 1.4.2 .items : Key, Value 모두 가져오기
for item in lunch.items():
    print(item)
# => ('중국집', '032')
# => ('분식집', '031')

# 1.4.3 .values : Values만 가져오기
for value in lunch.values():
    print(value)
# => 032
# => 031

# 1.4.4 .keys : Key만 가져오기
for key in lunch.keys():
    print(key)
# => 중국집
# => 분식집

'''
Python dictionary 연습 문제
'''

# 1. 평균을 구하시오.
score = {
    '수학': 80,
    '국어': 90,
    '음악': 100
}

# 아래에 코드를 작성해 주세요.
print('==== Q1 ====')

sum_score = 0
for subject_score in score.values():
    sum_score += subject_score

print(f'평균은 {sum_score/3}입니다.')

# 2. 반 평균을 구하시오. -> 전체 평균
scores = {
    '민승': {
        '수학': 80,
        '국어': 90,
        '음악': 100
    },
    '건희': {
        '수학': 80,
        '국어': 90,
        '음악': 100
    }
}

# 아래에 코드를 작성해 주세요.
print('==== Q2 ====')

total = 0
cnt = 0
for student in scores.values():
    # print(student)
    for sub_score in student.values():
        total += int(sub_score)
        cnt+=1
print(total/cnt)

# 3. 도시별 최근 3일의 온도입니다.
cities = {
    '서울': [-6, -10, 5],
    '대전': [-3, -5, 2],
    '광주': [0, -2, 10],
    '부산': [2, -2, 9],
}

# 3-1. 도시별 최근 3일의 온도 평균은?

# 아래에 코드를 작성해 주세요.
print('==== Q3-1 ====')
'''
출력 예시)
서울 : 평균온도
대전 : 평균온도
광주 : 평균온도
부산 : 평균온도
'''

for city in cities.keys():
   total = 0
   cnt = 0
   for temp in cities.get(city):
       total += temp
       cnt += 1
   avg = total/cnt
   print(f'{city} : {avg}')
       
print('다른 방법')
for name, temp in cities.items(): 
    # 첫번째 시행 
    # name = "서울" 
    # temp = [-6, -10, 5] 
    average_temp = sum(temp) / len(temp) 
    print(f'{name} : {average_temp}') 

# 3-2. 도시 중에 최근 3일 중에 가장 추웠던 곳, 가장 더웠던 곳은?

# 아래에 코드를 작성해 주세요.
print('==== Q3-2 ====')

cold = 0
hot = 0
count = 0
hot_city = ""
cold_city = ""

for name, temp in cities.items():
    # 첫 번째 시행
    # name = "서울"
    # temp = [-6, -10, 5]
    if count == 0: # 첫번째 시행을 위한 처리 
        hot = max(temp)
        cold = min(temp)
        hot_city = name
        cold_city = name
    else:
        # 최저 온도가 cold보다 더 추우면, cold에 넣고
        if min(temp) < cold:
            cold = min(temp)
            cold_city = name
        # 최고 온도가 hot보다 더 더우면, hot에 넣고
        if max(temp) > hot:
            hot = max(temp)
            hot_city = name
    count += 1

print(hot_city)
print(cold_city)

# 3-3. 위에서 서울은 영상 2도였던 적이 있나요?

# 아래에 코드를 작성해 주세요.
print('==== Q3-3 ====')

if 2 in cities["서울"]:
    print("네! 있어요")
else:
    print("없어요!")

# 새로운 문제

t4ir = {
    "location": ["역삼", "강남", "삼성", "왕십리"],
    "language": {
        "python": {
            "python standard library": ["os", "random", "webbrowser"],
            "frameworks": {
                "flask": "micro",
                "django": "full-functioning"
            },
            "data_science": ["numpy", "pandas", "scipy", "sklearn"],
            "scraping": ["requests", "bs4"],
        },
        "web" : ["HTML", "CSS"]
    },
    "classes": {
        "connected":  {
            "lecturer": "유창오",
            "manager": "유주희",
            "class president": "정세환",
            "groups": {
                "A": ["정세환", "오은애", "황민승", "소현우", "김한석"],
                "B": ["최재범", "서혁진", "감자", "이도현", "합기도"],
                "C": ["이수연", "남찬우", "이승희", "은승찬", "김건"],
                "D": ["박경희", "김영선", "이동열", "이건희", "최찬종"],
                "E": ["공선아", "최주현"]
            }
        },
        "bigdata": {
            "lecturer": "이민교",
            "manager": "매니저"
        }
    }
}


"""
난이도* 1. 지역(location)은 몇개 있나요? : list length
출력예시)
4
"""
print("지역의 개수")
print(len(t4ir.get("location")))


"""
난이도** 2. python standard library에 'requests'가 있나요? : 접근 및 list in
출력예시)
False
"""
print("python standard library에 'request'가 존재 ?")
if 'requests' in t4ir.get("language").get("python")["python standard library"]:
    print('True')
else:
    print('False')

"""
난이도** 3. connected반의 반장의 이름을 출력하세요. : depth 있는 접근
출력예시)
정세환
"""
print("반장의 이름을 출력")
print(t4ir.get("classes").get("connected").get("class president"))
"""
난이도*** 4. t4ir에서 배우는 언어들을 출력하세요. : dictionary.keys() 반복
출력 예시)
python
web
"""
print("배우는 언어들을 출력")
for language in t4ir.get("language").keys():
    print(language)

"""
난이도*** 5 t4ir bigdata반의 강사와 매니저의 이름을 출력하세요. dictionary.values() 반복
출력 예시)
이민교
매니저
"""
print("문제 5")
for name in t4ir.get("classes").get("bigdata").values():
    print(name)

"""
난이도***** 6. framework들의 이름과 설명을 다음과 같이 출력하세요. : dictionary 반복 및 string interpolation
출력 예시)
flask는 micro이다.
django는 full-functioning이다.
"""
print("문제 6")
for framework, function in t4ir.get("language").get("python").get("frameworks").items():
    print(f'{framework}는 {function}이다.')

"""
난이도***** 7. 오늘 당번을 뽑기 위해 groups의 E 그룹에서 한명을 랜덤으로 뽑아주세요. : depth 있는 접근 + list 가지고 와서 random.
출력예시)
오늘의 당번은 황민승
"""

import random
print("문제 7")
print(f'오늘의 당번은 {random.choice(t4ir.get("classes").get("connected").get("groups").get("E"))}')