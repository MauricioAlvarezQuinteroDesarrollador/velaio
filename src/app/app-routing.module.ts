import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'create-task', loadComponent: () => import('./page/create-task/create-task.component').then(mod => mod.CreateTaskComponent)},
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
