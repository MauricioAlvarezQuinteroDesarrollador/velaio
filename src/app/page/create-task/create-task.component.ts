import { Component, inject, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {
  adult,
  noWhiteSpaceValidator,
} from 'src/app/utils/customValidators/CustomValidators';
import { Task, TaskService, User } from 'src/app/services/task.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
})
export class CreateTaskComponent {
  taskForm = this.fb.group({
    nameTask: ['', [Validators.required, noWhiteSpaceValidator]],
    state: ['Completada', Validators.required],
    dateLimit: ['',],
  });

  userForm = this.fb.group({
    nameUser: ['', [Validators.required, noWhiteSpaceValidator, Validators.minLength(5)]],
    age: ['', [Validators.required, adult]],
    skill: [''],
  });

  skills: string[] = [];

  users: User[] = [];
  isUsers = false;

  private _snackBar = inject(MatSnackBar);
  constructor(
    private fb: FormBuilder,
    private renderer: Renderer2,
    private taskService: TaskService,
    private router: Router
  ) {}

  submit() {
    const data: Task = {
      nameTask: this.taskForm?.value['nameTask']!,
      state: this.taskForm.value['state']!,
      dateLimit: this.taskForm.value['dateLimit']!,
      users: this.users
    }
    this.taskService.createTaskApi(data).subscribe(res=>{
      this.openSnackBar('Tarea creada correctamente');
      setTimeout(()=>{
        this.back()
      }, 1000)
    });
    
  }

  createTask() {
    this.isUsers = true;
  }

  addUser() {
    const nameUser = this.userForm.get('nameUser')?.value || '';
    if (
      this.users.find(
        (o) => o.nameUser.toLocaleLowerCase() === nameUser.toLocaleLowerCase()
      )
    ) {
      this.openSnackBar(`Nombre "${nameUser}" ya existe en esta tarea`);
    } else {
      this.users.push({
        nameUser,
        age: parseInt(this.userForm.get('age')?.value!),
        skills: this.skills,
      });
      this.cleanUserForm();      
    }
  }

  cleanUserForm() {
    this.userForm.reset();
    this.skills = [];
  }

  addSkill(e: any = null) {
    if (e) e.preventDefault();
    if (this.userForm.get('skill')?.value?.trim())
      this.skills.push(this.userForm.get('skill')?.value?.trim() || '');

    this.userForm.patchValue({ skill: '' });
    this.renderer.selectRootElement('#skill').focus();
  }

  deleteSkill(index: number) {
    this.skills.splice(index, 1);
  }

  deleteUser(index: number) {
    this.users.splice(index, 1);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message,  '', {
      duration: 5000
    });
  }

  back(){
    this.router.navigate([''])
  }
}
