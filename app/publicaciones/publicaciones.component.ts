import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TaskI } from '../models/task.interface';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.scss'],
})
export class PublicacionesComponent implements OnInit {

  todos: TaskI[];
  
  constructor(private todoService: AuthService) { }

  ngOnInit(){
  //   this.todoService.getTodos().subscribe((todos) =>{
  //     console.log('Todoss', todos);
  //     this.todos = todos;
  //   })
  // }
  // onRemove(idTask:string){
  //   this.todoService.removeTodo(idTask);
  }
}
