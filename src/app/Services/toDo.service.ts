import { Injectable } from '@angular/core';
import { toDo } from '../Interfaces/todolist.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class toDoService {
  constructor(private http: HttpClient) {}

  getTodoList() {
    return this.http.get<toDo[]>('https://jsonplaceholder.typicode.com/todos');
  }
}
