from django.urls import path
from .views import BookListCreateView, BookUpdateDeleteView

urlpatterns = [
    path('api/books', BookListCreateView.as_view(), name='book-list-create'),
    path('api/books/<int:pk>', BookUpdateDeleteView.as_view(), name='book-update-delete'),
]
