import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { Component, OnInit } from '@angular/core'
import { TodoService } from 'src/app/services/todo.service'

import { todo } from './todo'

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: any = []
  todoMoving: number = 0
  constructor (private todoService: TodoService) {}

  ngOnInit (): void {
    this.todoService.getTodos().subscribe(res => (this.todos = res))
  }
  move ($event: any, index: any) {
    this.todoMoving = index
  }
  drop (event: any, index: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        this.todos[index].todos_itens,
        event.previousIndex,
        event.currentIndex
      )
    } else {
      //Fazer um update nesse array no dbjson
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
      //Adicionando dado no novo Todo
      this.todoService
        .transferTodoToOtherTodo(this.todos[index])
        .subscribe(res => console.log(res))
      // .subscribe(res => console.log(res))

      //removendo dado do todo antigo
      this.todoService
      .transferTodoToOtherTodo(this.todos[this.todoMoving])
      .subscribe(res => console.log(res))
    }
  }
  newItem ($event: any, index: any) {
    // console.log(this.todos[index])
    this.todos[index].todos_itens.push($event.target.value)
    $event.target.value = ''
    console.log(this.todos[index])
    this.todoService
      .createtodoInArray(this.todos[index])
      .subscribe(res => console.log(res))
  }
  newListItem ($event: any) {
    this.todoService
      .createTodoList($event.target.value)
      .subscribe(res => console.log(res))
    this.todos.push({
      id: this.todos.length + 1,
      todo_name: $event.target.value,
      todos_itens: []
    })
    $event.target.value = ''
  }
}
