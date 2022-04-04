import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, take } from 'rxjs'
import { todo } from '../components/todo/todo'

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  url = 'http://localhost:3000/todos'
  constructor (private http: HttpClient) {}
  createTodoList (nameList: string) {
    return this.http
      .post<todo>(this.url, { todo_name: nameList, todos_itens: [] })
      .pipe(take(1))
  }
  getTodos () {
    return this.http.get(this.url).pipe(take(1))
  }
  createtodoInArray (todo: todo) {
    return this.http.patch(`${this.url}/${todo.id}`, todo).pipe(take(1))
  }
  transferTodoToOtherTodo (todo: todo) {
    return this.http.patch(`${this.url}/${todo.id}`, todo).pipe(take(1))
  }
}
