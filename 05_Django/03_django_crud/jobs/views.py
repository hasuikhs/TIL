from django.shortcuts import render, redirect
from .models import Job
from faker import Faker
import requests

# Create your views here.
def index(request):
    jobs = Job.objects.all()[::-1]
    context = {'jobs' : jobs}
   
    return render(request, 'jobs/index.html', context)

def new(request):
    return render(request, 'jobs/new.html')

def create(request):
    print(request)
    name = request.POST.get('name')
    print(name)
    faker = Faker('ko_KR')

    past_job = faker.job()
    print(past_job)

    jobs = Job(name=name, past_job=past_job)
    jobs.save()

    return redirect('jobs:index')

def past_job(request):
    # [기본] Faker로 랜덤 직업 생성
    name = request.POST.get('name')
    user = Job.objects.filter(name=name).first()

    # 유저 정보가 있을 때
    if user:
        past_job = user.past_job   # 기존 직업 정보 가져오기
    # 유저 정보가 없을 때
    else:
        faker = Faker()
        past_job = faker.job()   # 새로운 직업 정보 만들기
        job = Job(name=name, past_job=past_job)
        job.save()
    # [심화] GIPHY API
    api_url = 'http://api.giphy.com/v1/gifs/search'
    api_key = 'AFpNkYwtJ0WW8jVqKypBpYtb41zUjxkS'

    data = requests.get(f'{api_url}?api_key={api_key}&q={past_job}&limit=1&lang=ko').json()

    try:
        img_url = data.get('data')[0].get('images').get('original').get('url')
    except IndexError:
        img_url = None
    context = {
        'name' : name,
        'past_job' : past_job,
        'img_url' : img_url,
    }
    return render(request, 'jobs/past_job.html', context)