from django.shortcuts import render, redirect, get_object_or_404
from IPython import embed
from .models import Article
from .forms import ArticleForm

# Create your views here.
def index(request):
    articles = Article.objects.all()[::-1]
    context = {'articles' : articles}
    return render(request, 'articles/index.html', context)

def create(request):
    # POST 요청 -> 데이터를 받아서 DB에 저장
    if request.method == 'POST':
        # Binding 과정
        # 폼 인스턴스를 생성하고, 전달받은 데이터를 채운다.
        # 인스턴스에 데이터를 채워서, 유효성 검증을 진행한다.
        form = ArticleForm(request.POST)
        if form.is_valid():
            # # cleaned_data를 통해 딕셔너리 안 데이터를 검증한다.
            # title = form.cleaned_data.get('title')
            # content = form.cleaned_data.get('content')
            # article = Article.objects.create(title=title, content=content)
            article = form.save()
        return redirect('articles:detail', article.pk)
    else:
        form = ArticleForm()
    # form으로 전달받는 형태가 2가지
    # 1. GET요청 -> 비어있는 폼 전달
    # 2. 유효성 검증 실패 -> 에러 메시지를 포함한 채로 폼 전달
    context = {'form':form}
    # return render(request, 'articles/create.html', context)
    return render(request, 'articles/form.html', context)

def detail(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    context = { 'article' : article }
    return render(request, 'articles/detail.html', context)

def delete(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    if request.method=='POST':
        article.delete()
        return redirect('articles:index')
    else:
        return redirect('articles:detail', article.pk)

def update(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    if request.method == 'POST':
        # form = ArticleForm(request.POST)
        form = ArticleForm(request.POST, instance=article)
        if form.is_valid():
            # article.title = form.cleaned_data.get('title')
            # article.content = form.cleaned_data.get('content')
            # article.save()
            article=form.save()
            return redirect('articles:detail', article.pk)
    else:
        # form = ArticleForm(initial={
        #     'title' : article.title,
        #     'content' : article.content
        # })
        form = ArticleForm(instance=article)
        # context로 전달되는 2가지 form 형식
        # 1. GET -> 초기값을 펌에 넣어서 사용자에게 던져줌
        # 2. POST -> is_valid가 False가 리턴되었을 때, 오류메시지 포함해서 사용자에게 던져줌
    context = {'form': form}
    # return render(request, 'articles/create.html', context)
    return render(request, 'articles/form.html', context)