from django.shortcuts import render, redirect
from .models import Movie

# Create your views here.
def index(request):
    movie = Movie.objects.all()
    context = {'movies' : movie}
    return render(request, 'movies/index.html', context)

def new(request):
    if request.method == 'POST':

        title = request.POST.get('title')
        description = request.POST.get('description')
        poster = request.POST.get('poster')

        movie = Movie(title=title, description=description, poster=poster)
        movie.save()

        return redirect(f'/movies/{movie.pk}/')
    else:
        return render(request, 'movies/new.html')

def detail(request, movie_pk):
    movie = Movie.objects.get(pk=movie_pk)
    comments = movie.comment_set.all()
    context = {
         'movie' : movie,
         'comments' : comments,
    }
    return render(request, 'movies/detail.html', context)

def edit(request, movie_pk):
    # 1. 수정할 게시글 인스턴스 가져오기
    movie = Movie.objects.get(pk=movie_pk)
    if request.method == 'POST':
        # 2. 폼에서 전달받은 데이터 덮어쓰기
        movie.title = request.POST.get('title')
        movie.description = request.POST.get('description')
        movie.poster = request.POST.get('poster')

        # 3. DB 저장
        movie.save()

        # 4. 저장 끝났으면 게시글 Detial로 이동시키기
        return redirect(f'/movies/{movie.pk}/')
    else:
        context = { 'movie': movie }
        return render(request, 'movies/update.html', context)

def delete(request, movie_pk):
    movie = Movie.objects.get(pk=movie_pk)
    movie.delete()
    return redirect('/movies/')