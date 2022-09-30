from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json, logging, os
from datetime import datetime
from pymongo import MongoClient, DESCENDING

mongo_uri = 'mongodb://' + os.environ["MONGO_HOST"] + ':' + os.environ["MONGO_PORT"]
db = MongoClient(mongo_uri)['test_db']
todos_collection = db['todos']

class TodoListView(APIView):

    def _drop_collection(self):
        db.drop_collection('todos')

    def _get_todos(self):
        todos = []
        for todo in todos_collection.find().sort('date', DESCENDING):
            todos.append({'_id' : str(todo.get('_id')), 'todo' : todo.get('todo'), 'date': todo.get('date')})
        return todos

    def get(self, request):
        return Response(self._get_todos(), status=status.HTTP_200_OK)

    def post(self, request):
        todo = request.data.get('todo')
        if not todo:
            return Response({'error': "Todo cannot be empty"}, status=status.HTTP_400_BAD_REQUEST)
        todo = {'todo' : todo, 'date' : datetime.now()}
        todos_collection.insert_one(todo.copy())
        return Response(todo, status=status.HTTP_201_CREATED)
