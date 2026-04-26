import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonIcon, IonCard, IonCardHeader,
  IonCardTitle, IonCardSubtitle, IonCardContent,
  IonButtons, IonMenuButton
} from '@ionic/angular/standalone';

import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  standalone: true,
  imports: [
    CommonModule, // 🔥 FIX for *ngIf
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonIcon,
    IonCard, IonCardHeader, IonCardTitle,
    IonCardSubtitle, IonCardContent,
    IonButtons, IonMenuButton
  ],
})
export class Tab1Page {

  lastAction = '';

  constructor(private actionSheetCtrl: ActionSheetController) {}

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Choose Action',
      buttons: [
        {
          text: 'Book',
          handler: () => { this.lastAction = 'Booked'; } // 🔥 FIX
        },
        {
          text: 'Save',
          handler: () => { this.lastAction = 'Saved'; }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }
}
