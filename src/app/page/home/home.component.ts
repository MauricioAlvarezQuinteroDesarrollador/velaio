import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task, TaskService } from 'src/app/services/task.service';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {

  private userServiceSubscription: Subscription | undefined;
  state = 'Todas'
  task: Task[] = [];
  taskFilter:Task[] = [];

  constructor(private taskService: TaskService){}

  ngOnInit(){
    console.log("llego")
    this.taskService.getTaksApi().subscribe(data =>{
      this.task = data;
      this.taskFilter = data;
    })
    
    /*this.task = [
      {
        dateLimit:"1900-02-02",
        nameTask: "test",
        state: "Completada",
        users: [
          {
            nameUser: 'mauro',
            age: 18,
            skills:['js', 'java']
          },
          {
            nameUser: 'mauro',
            age: 18,
            skills:['js', 'java']
          },
          {
            nameUser: 'mauro',
            age: 18,
            skills:['js', 'java']
          }
        ]
      },
      {
        dateLimit:"1900-02-02",
        nameTask: "test",
        state: "Pendiente",
        users: [
          {
            nameUser: 'mauro',
            age: 18,
            skills:['js', 'java']
          }
        ]
      },
    ];*/
    
    
  }

  ngOnDestroy(): void {
    this.userServiceSubscription?.unsubscribe();
  }

  changeFilter(){
    if(this.state != 'Todas'){
      this.taskFilter = this.task.filter(item=> item.state === this.state);
    }else{
      this.taskFilter = this.task
    }
  }
}
