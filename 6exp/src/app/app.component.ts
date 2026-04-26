import { Component } from '@angular/core';
import {
  IonApp, IonRouterOutlet, IonMenu, IonHeader, IonToolbar,
  IonTitle, IonContent, IonList, IonItem, IonLabel, IonIcon
} from '@ionic/angular/standalone';

import { RouterLink } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    IonApp, IonRouterOutlet, IonMenu, IonHeader,
    IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonIcon,
    RouterLink
  ],
})
export class AppComponent {

  constructor(private menu: MenuController) {}

  closeMenu() {
    this.menu.close('mainMenu');
  }
}
