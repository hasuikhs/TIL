from django.contrib import admin
from .models import Article, Comment, Hashtag

# Register your models here.
class ArticleAdmin(admin.ModelAdmin):
    list_display = ('pk', 'title', 'content', 'created_at', 'updated_at',)

class CommentAdmin(admin.ModelAdmin):
    list_display = ('pk', 'article', 'content', 'created_at', 'updated_at',)

class HashtagAdmin(admin.ModelAdmin):
    list_display = ('content', )

admin.site.register(Comment, CommentAdmin)
admin.site.register(Article, ArticleAdmin)
admin.site.register(Hashtag, HashtagAdmin)