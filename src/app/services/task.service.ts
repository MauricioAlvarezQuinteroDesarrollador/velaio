import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';



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

const URL_API = `http://localhost:8082`;

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  listTask: Task[] = [];
  constructor(private http: HttpClient) { }  

  getTaksApi():Observable<any>{
    return this.http.get(`${URL_API}/tasks`, { headers: { Accept: 'application/json' } })
    .pipe(
      map((response:any)=> {
        this.listTask =  response.res;
        return response.res;
      })
    );
  }

  createTaskApi(task:Task):Observable<any>{
    return this.http.post(`${URL_API}/create-task`, task, { headers: { Accept: 'application/json' } })
    .pipe(
      map((response:any)=> {
        this.listTask.push(task)
        return response.res;
      })
    );
  }
}
