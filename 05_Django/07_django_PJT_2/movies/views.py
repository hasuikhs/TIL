from django.shortcuts import render, redirect
from .models import Movie
from .forms import MovieForm

# Create your views here.
def index(request):
    movie = Movie.objects.all()
    context = {
        'movies' : movie
    }
    return render(request, 'movies/index.html', context)

@login_required
def new(request):
    if request.method == 'POST':
        form = MovieForm(request.POST, request.FILES)
        if form.is_valid():
            movie = form.save(commit=False)
            movie.user = request.user
            movie.save()
            return redirect('movies:detail', movie.pk)
    else:
        form = MovieForm()
    
    context = {
        'form': form,
    }
    return render(request, 'movies/form.html', context)

def detail(request, pk):
    movie = Movie.objects.get(pk=pk)
    ratings = movie.rating_set.all()
    rating_form = RatingForm()

    context = {
        'movie': movie,
        'ratings': ratings,
        'rating_form': rating_form,
    }
    return render(request, 'movies/detail.html', context)

@login_required
def edit(request, pk):
    movie = Movie.objects.get(pk=pk)
    if movie.user != request.user:
        return redirect('movies:index')

    if request.method == 'POST':
        form = MovieForm(request.POST, request.FILES, instance=movie)
        if form.is_valid():
            movie = form.save()
            return redirect('movies:detail', movie.pk)
    else:
        form = MovieForm(instance=movie)
    
    context = {
        'form': form,
    }
    return render(request, 'movies/form.html', context)

def ratings_delete(request, movie_pk):    if request.method == 'POST':
        rating.delete()
        return redirect('movies:detail', movie_pk)