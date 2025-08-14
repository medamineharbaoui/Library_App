from django.shortcuts import get_object_or_404
from .models import Book

def list_books():
    return Book.objects.all().order_by('-created_at')

def get_book(pk: int) -> Book:
    return get_object_or_404(Book, pk=pk)

def delete_book(pk: int) -> None:
    book = get_book(pk)
    book.delete()
