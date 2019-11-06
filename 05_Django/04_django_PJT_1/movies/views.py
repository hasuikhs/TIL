from django.shortcuts import render, redirect
from .models import Movie, Comment

# Create your views here.
def index(request):
    movie = Movie.objects.all()
    context = {'movies' : movie}
    return render(request, 'movies/index.html', context)

# 사용자로부터 데이터를 받아서 DB에 저장하는 함수
def create(request):
    if request.method == 'POST':

        title = request.POST.get('title')
        title_en = request.POST.get('title_en')
        audience = request.POST.get('audience')
        open_date = request.POST.get('open_date')
        genre = request.POST.get('genre')
        watch_grade = request.POST.get('genre')
        score = request.POST.get('score')
        poster_url = request.POST.get('poster_url')
        description = request.POST.get('description')

        movie = Movie(title=title, title_en=title_en, audience=audience, open_date=open_date, genre=genre, watch_grade=watch_grade, score=score, poster_url=poster_url, description=description)
        movie.save()

        return redirect(f'/movies/{movie.pk}/')
    else:
        return render(request, 'movies/create.html')


def detail(request, movie_pk):
    movie = Movie.objects.get(pk=movie_pk)
    comments = movie.comment_set.all()
    context = {
         'movie' : movie,
         'comments' : comments,
    }
    return render(request, 'movies/detail.html', context)

# 수정 내용 전달 받아서 DB에 저장(반영)
def update(request, movie_pk):
    # 1. 수정할 게시글 인스턴스 가져오기
    movie = Movie.objects.get(pk=movie_pk)
    if request.method == 'POST':
        # 2. 폼에서 전달받은 데이터 덮어쓰기
        movie.title = request.POST.get('title')
        movie.title_en = request.POST.get('title_en')
        movie.audience = request.POST.get('audience')
        movie.open_date = request.POST.get('open_date')
        movie.genre = request.POST.get('genre')
        movie.watch_grade = request.POST.get('genre')
        movie.score = request.POST.get('score')
        movie.poster_url = request.POST.get('poster_url')
        movie.description = request.POST.get('description')

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

# 댓글 생성 뷰 함수
def comments_create(request, movie_pk):
    movie = Movie.objects.get(pk=movie_pk)
    if request.method == 'POST':
        content = request.POST.get('content')
        comment = Comment(movie=movie, content=content)
        comment.save()
        return redirect('movies:detail', movie_pk)
    else:
        return redirect('movies:detail', movie_pk)

# 댓글 삭제 뷰 함수
def comments_delete(request, movie_pk, comment_pk):
    if request.method =='POST':
        comment = Comment.objects.get(pk=comment_pk)
        comment.delete()
    return redirect('movies:detail', movie_pk)