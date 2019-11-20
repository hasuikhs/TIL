import hashlib
from itertools import chain
from django.views.decorators.http import require_POST
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import get_user_model
from IPython import embed
from .models import Article, Comment, Hashtag
from .forms import ArticleForm, CommentForm
from django.http import JsonResponse, HttpResponseBadRequest

# Create your views here.
def index(request):
    # embed()
    # request.session._session 을 치면 session을 볼 수 있다.
    articles = Article.objects.all()[::-1]
    context = {'articles' : articles}
    return render(request, 'articles/index.html', context)

@login_required
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
            article = form.save(commit=False)
            article.user = request.user
            article.save()
            
            # hashtag
            # 게시글 내용을 잘라서 리스트로 만듦
            for word in article.content.split():
                # word가 '#'으로 시작할 경우 해시태그 등록
                if word.startswith('#'):
                    hashtag, created = Hashtag.objects.get_or_create(content=word)
                    article.hashtags.add(hashtag)
                    

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
    person = get_object_or_404(get_user_model(), pk=article.user_id)
    comment_form = CommentForm()
    comments = article.comment_set.all()
    context = {
        'article' : article,
        'comment_form' : comment_form,
        'comments' : comments,
        'person' : person,
    }
    return render(request, 'articles/detail.html', context)

@require_POST
def delete(request, article_pk):
    # 지금 사용자가 로그인 되어있는지?
    if request.user.is_authenticated:
        # 삭제할 게시글 가져오기
        article = get_object_or_404(Article, pk=article_pk)
        # 로그인한 사용자와 게시글 작성자 비교
        if request.user == article.user:
            article.delete()
        else:
            return redirect('articles:detail', article.pk)
    return redirect('articles:index')

@login_required
def update(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    if request.user == article.user:
        if request.method == 'POST':
            # form = ArticleForm(request.POST)
            form = ArticleForm(request.POST, instance=article)
            if form.is_valid():
                # article.title = form.cleaned_data.get('title')
                # article.content = form.cleaned_data.get('content')
                # article.save()
                article=form.save()

                # hashtag
                article.hashtags.clear()
                # 게시글 내용을 잘라서 리스트로 만듦
                for word in article.content.split():
                    # word가 '#'으로 시작할 경우 해시태그 등록
                    if word.startswith('#'):
                        hashtag, created = Hashtag.objects.get_or_create(content=word)
                        article.hashtags.add(hashtag)

                return redirect('articles:detail', article.pk)
        else:
            # form = ArticleForm(initial={
            #     'title' : article.title,
            #     'content' : article.content
            # })
            form = ArticleForm(instance=article)
    else:
        return redirect('articles:index')
    
    # context로 전달되는 2가지 form 형식
    # 1. GET -> 초기값을 펌에 넣어서 사용자에게 던져줌
    # 2. POST -> is_valid가 False가 리턴되었을 때, 오류메시지 포함해서 사용자에게 던져줌
    context = {
        'form' : form,
        'article' : article,    
    }
    # return render(request, 'articles/create.html', context)
    return render(request, 'articles/form.html', context)

@require_POST
def comments_create(request, article_pk):
    article = get_object_or_404(Article, pk=article_pk)
    if request.user.is_authenticated:
        comment_form = CommentForm(request.POST)
        if comment_form.is_valid():
            # save 메서드 -> 선택 인자 : (기본값) commit=True
            # DB에 바로 저장되는 것을 막아준다.
            comment = comment_form.save(commit=False)
            comment.article = article
            comment.user = article.user
            comment.save()
    return redirect('articles:detail', article.pk)
    

@require_POST
def comments_delete(request, article_pk, comment_pk):
    # 1. 로그인 여부 확인
    if request.user.is_authenticated:
        comment = get_object_or_404(Comment, pk=comment_pk)
        # 2. 로그인한 사용자와 댓글 작성자가 같을 경우
        if request.user == comment.user:
            comment.delete()
    return redirect('articles:detail', article_pk)

@login_required
def like(request, article_pk):
    if request.is_ajax():
        article = get_object_or_404(Article, pk=article_pk)

        user = request.user

        if user in article.like_users.all():
            article.like_users.remove(user)
            liked = False
        else:
            article.like_users.add(user)
            liked = True
        context = {
            'liked' : liked,
            'count' : article.like_users.count()
        }
        return JsonResponse(context)
    else:
        return HTTPResponseBadRequest

@login_required
def follow(request, article_pk, user_pk):
    # 게시글 작성한 유저
    person = get_object_or_404(get_user_model(), pk=user_pk)
    # 지금 접속하고 있는 유저
    user = request.user
    if person != user:
        if person.followers.filter(pk=user.pk).exists():
            person.followers.remove(user)
        else:
            person.followers.add(user)
    # # 게시글 작성 유저 팔로워 목록에 접속 중인 유저가 있을 경우
    # # -> unfollow
    # if user in person.followers.all() :
    #     person.followers.remove(user)        
    # # 명단에 없으면
    # # -> follow
    # else:
    #     person.followers.add(user)
    # 게시글 상세정보로 redirect
    return redirect('articles:detail', article_pk)

# 내가 팔로우 하는 사람의 글 + 내가 작성한 글
def list(request):
    # 내가 팔로우하고 있는 사람들
    followings = request.user.followings.all()
    # 내가 팔로우하고 있는 사람들 + 나 -> 합치기
    followings = chain(followings, [request.user])
    # 위 명단 사람들 게시글 가져오기
    # __in ~에서 탐색
    articles = Article.objects.filter(user__in=followings).order_by('-pk').all()
    comment_form = CommentForm()
    context = {
        'articles' : articles,
        'comment_form' : comment_form,
    }
    return render(request, 'articles/article_list.html', context)

# 모든 사람 글 보여주기
def explore(request):
    articles = Article.objects.all()
    comment_form = CommentForm()
    context = {
        'articles' : articles,
        'comment_form' : comment_form,
    }
    return render(request, 'articles/article_list.html', context)

# Hashtag 글 모아보기
def hashtag(request, hash_pk):
    # 해시태그 가져오기
    hashtag = get_object_or_404(Hashtag, pk=hash_pk)
    # 해당 해시태그를 참조하는 게시글들 가져오기
    articles = hashtag.article_set.order_by('-pk')
    context = {
        'hashtag' : hashtag,
        'articles' : articles,
    }
    return render(request, 'articles/hashtag.html', context)