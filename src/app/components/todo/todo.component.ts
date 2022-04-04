import { Component, OnInit } from '@angular/core'
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop'
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  // todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep']
  // done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog']
  todos = [
    {
      id: 1,
      todo_name: 'Segunda-Feira',
      todos_itens: [
        'Get to work',
        'Pick up groceries',
        'Go home',
        'Fall asleep'
      ]
    },
    {
      id: 2,
      todo_name: 'Terca-Feira',
      todos_itens: [
        'Meu amigo tijolo',
        'Pick up groceries',
        'Go home',
        'Fall asleep'
      ]
    },
    {
      id: 3,
      todo_name: 'Quarta-Feira',
      todos_itens: [
        'Get to work',
        'Pick up groceries',
        'Go home',
        'Fall asleep'
      ]
    },
    {
      id: 4,
      todo_name: 'Quinta-feira',
      todos_itens: [
        'Meu amigo tijolo',
        'Pick up groceries',
        'Go home',
        'Fall asleep'
      ]
    }
  ]
  constructor () {}

  ngOnInit (): void {}
  drop (event: any, index: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        this.todos[index].todos_itens,
        event.previousIndex,
        event.currentIndex
      )
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        index
      )
    }
  }
  newItem ($event: any, index: any) {
    // console.log(this.todos[index])
    this.todos[index].todos_itens.push($event.target.value)
    $event.target.value = ''
    // console.log()
  }
}
