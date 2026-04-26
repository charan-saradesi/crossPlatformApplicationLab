import { Injectable } from '@angular/core';
import { Todo } from '../interfaces/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public todos: Todo[] = [];

  constructor() {}

  addTodo(task: string) {
    if (task.trim().length === 0) return;
    this.todos.push({
      id: Date.now(),
      task: task,
      isCompleted: false
    });
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }
}
