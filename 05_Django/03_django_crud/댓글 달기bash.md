```bash
In [1]: article = Article.objects.get(pk=1)

In [2]: article
Out[2]: <Article: f[{self.pk}] {self.title}>

In [3]: comment = Comment()

In [4]: comment.content = 'HIHI.......!'

In [5]: comment.article = article

In [6]: comment.save()

In [7]: comment
Out[7]: <Comment: HIHI.......!>

In [8]: Comment.objects.all()
Out[8]: <QuerySet [<Comment: HIHI.......!>]>

In [9]: comment.article.pk
Out[9]: 1

In [10]: comment.article.title
Out[10]: 'fxdg'

In [11]: comment = Comment(article=article, content='second content')

In [12]: Comment.objects.all()
Out[12]: <QuerySet [<Comment: HIHI.......!>]>

In [13]: comment.save()

In [14]: Comment.objects.all()
Out[14]: <QuerySet [<Comment: second content>, <Comment: HIHI.......!>]>

In [15]: article
Out[15]: <Article: f[{self.pk}] {self.title}>

In [16]: dir(article)
Out[16]: 
['DoesNotExist',
 'MultipleObjectsReturned',
 '__class__',
 '__delattr__',
 '__dict__',
 '__dir__',
 '__doc__',
 '__eq__',
 '__format__',
 '__ge__',
 '__getattribute__',
 '__getstate__',
 '__gt__',
 '__hash__',
 '__init__',
 '__init_subclass__',
 '__le__',
 '__lt__',
 '__module__',
 '__ne__',
 '__new__',
 '__reduce__',
 '__reduce_ex__',
 '__repr__',
 '__setattr__',
 '__setstate__',
 '__sizeof__',
 '__str__',
 '__subclasshook__',
 '__weakref__',
 '_check_column_name_clashes',
 '_check_constraints',
 '_check_field_name_clashes',
 '_check_fields',
 '_check_id_field',
 '_check_index_together',
 '_check_indexes',
 '_check_local_fields',
 '_check_long_column_names',
 '_check_m2m_through_same_relationship',
 '_check_managers',
 '_check_model',
 '_check_model_name_db_lookup_clashes',
 '_check_ordering',
 '_check_property_name_related_field_accessor_clashes',
 '_check_single_primary_key',
 '_check_swappable',
 '_check_unique_together',
 '_do_insert',
 '_do_update',
 '_get_FIELD_display',
 '_get_next_or_previous_by_FIELD',
 '_get_next_or_previous_in_order',
 '_get_pk_val',
 '_get_unique_checks',
 '_meta',
 '_perform_date_checks',
 '_perform_unique_checks',
 '_save_parents',
 '_save_table',
 '_set_pk_val',
 '_state',
 'check',
 'clean',
 'clean_fields',
 'comment_set',
 'content',
 'created_at',
 'date_error_message',
 'delete',
 'from_db',
 'full_clean',
 'get_deferred_fields',
 'get_next_by_created_at',
 'get_next_by_updated_at',
 'get_previous_by_created_at',
 'get_previous_by_updated_at',
 'id',
 'objects',
 'pk',
 'prepare_database_save',
 'refresh_from_db',
 'save',
 'save_base',
 'serializable_value',
 'title',
 'unique_error_message',
 'updated_at',
 'validate_unique']

In [17]: comments = article.comment_set.all()

In [18]: comments
Out[18]: <QuerySet [<Comment: second content>, <Comment: HIHI.......!>]>

In [19]: comments.first()
Out[19]: <Comment: second content>

In [20]: comments.first().content
Out[20]: 'second content'

In [21]: comment = comments.first()

In [22]: comment
Out[22]: <Comment: second content>

In [23]: comment.article
Out[23]: <Article: f[{self.pk}] {self.title}>

In [24]: comment.article
Out[24]: <Article: f[{self.pk}] {self.title}>

In [25]: exit
```

