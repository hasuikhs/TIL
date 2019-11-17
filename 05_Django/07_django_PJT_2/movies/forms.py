from django import forms
from .models import Movie

class MovieForm(forms.ModelForm):
    title = forms.CharField(
        label = '영화 제목',
        max_length=100,
        widget = forms.TextInput(
            attrs = {
                'class' : 'title',
                'placeholder' : '제목 입력하세요'
            }
        )
    )
    description = forms.CharField(
        label = '영화 개요',
        widget = forms.Textarea(
            attrs = {
                'class' : 'description',
                'placeholder' : '내용 입력하세요',
                'rows' : 5,
                'cols' : 30
            }
        )
    )
    class Meta:
        model = Movie
        fields = ('title', 'description', 'poster')