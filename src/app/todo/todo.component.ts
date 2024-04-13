import { Component, OnInit } from '@angular/core';
import { toDo } from '../Interfaces/todolist.interface';
import { toDoService } from '../Services/toDo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todoList: toDo[] = [];

  constructor(private toDoService: toDoService) {}

  ngOnInit(): void {
    this.toDoService.getTodoList().subscribe((toDo) => {
      this.todoList = toDo;
      console.log(this.todoList);
    });
  }
  toggleCompletion(todo: toDo): void {
    todo.completed = !todo.completed;
  }
}
