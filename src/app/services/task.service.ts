import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';



export interface User {
  nameUser:string;
  age: number;
  skills: string[];
 }

 export interface Task {
  nameTask: string;
  state: string;
  dateLimit: string;
  users: User[];
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskSubject: BehaviorSubject<Task[]> = new BehaviorSubject([] as Task[]);

  public readonly tasks: Observable<Task[]> = this.taskSubject.asObservable();
  constructor() { }

  addTask(task:Task){
    this.taskSubject.next(this.taskSubject.getValue().concat([task]))
  }
}
