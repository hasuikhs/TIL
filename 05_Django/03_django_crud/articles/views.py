from django.shortcuts import render, redirect
from .models import Article, Comment

# Create your views here.
def index(request):
    articles = Article.objects.all()[::-1]
    context = {'articles' : articles}
    return render(request, 'articles/index.html', context)

# 사용자에게 게시글 작성 폼을 보여주는 함수
# def new(request):
#     return render(request, 'articles/new.html')

# 사용자로부터 데이터를 받아서 DB에 저장하는 함수
def create(request):
    # POST 요청일 경우 -> 게시글 생성 로직 수행
    if request.method == 'POST':
        
        title = request.POST.get('title')
        content = request.POST.get('content')
        image = request.FILES.get('image')

        article = Article(title=title, content=content, image=image)
        article.save()
    
        return redirect('articles:detail', article.pk)
    # GET 요청일 경우 -> 사용자에게 폼 보여주기
    else:
        return render(request, 'articles/create.html')


# 게시글 상세정보를 가져오는 함수
def detail(request, article_pk):
    article = Article.objects.get(pk=article_pk)
    comments = article.comment_set.all()
    context = {
         'article' : article,
         'comments' : comments,
    }
    return render(request, 'articles/detail.html', context)

# 
def delete(request, article_pk):
    article = Article.objects.get(pk=article_pk)
    article.delete()
    return redirect('articles:index')

# 수정 내용 전달 받아서 DB에 저장(반영)
def update(request, article_pk):
    # POST 요청 -> DB에 수정사항 반영
     # 1. 수정할 게시글 인스턴스 가져오기
    article = Article.objects.get(pk=article_pk)
    if request.method == 'POST':    
        # 2. 폼에서 전달받은 데이터 덮어쓰기
        article.title = request.POST.get('title')
        article.content = request.POST.get('content')
    
        # 3. DB 저장
        article.save()
    
        # 4. 저장 끝났으면 게시글 Detial로 이동시키기
        # return redirect(f'/articles/{article.pk}/')
        return redirect('articles:detail' , article.pk)
    else:
        context = { 'article': article }
        return render(request, 'articles/update.html', context)

# 댓글 생성 뷰 함수
def comments_create(request, article_pk):
    article = Article.objects.get(pk=article_pk)
    if request.method == 'POST':
        content = request.POST.get('content')
        comment = Comment(article=article, content=content)
        comment.save()
        return redirect('articles:detail', article_pk)
    else:
        return redirect('articles:detail', article_pk)

# 댓글 삭제 뷰 함수
def comments_delete(request, article_pk, comment_pk):
    if request.method =='POST':
        comment = Comment.objects.get(pk=comment_pk)
        comment.delete()
    return redirect('articles:detail', article_pk)