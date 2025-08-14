from django.shortcuts import render

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Book
from .serializers import BookSerializer
from . import services

# GET /books  —  POST /books
class BookListCreateView(generics.ListCreateAPIView):
    serializer_class = BookSerializer

    def get_queryset(self):
        return services.list_books()

# PUT /books/:id  —  DELETE /books/:id
class BookUpdateDeleteView(APIView):
    def put(self, request, pk: int):
        book = services.get_book(pk)
        serializer = BookSerializer(book, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk: int):
        services.delete_book(pk)
        return Response(status=status.HTTP_204_NO_CONTENT)

