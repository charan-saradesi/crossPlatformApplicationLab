import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonInput, IonButton, IonList,
  IonCheckbox, IonLabel, IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';

import { TodoService } from './services/todo.service';











export interface Todo {
  id: number;
  task: string;
  isCompleted: boolean;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonInput, IonButton, IonList,
    IonCheckbox, IonLabel, IonIcon
  ],
})
export class HomePage {
  public newTask: string = '';

  constructor(public todoService: TodoService) {
    // Register the trash icon so we can use it in the HTML
    addIcons({ trashOutline });
  }

  addTask() {
    this.todoService.addTodo(this.newTask);
    this.newTask = ''; // Clear the input field after adding
  }
}
