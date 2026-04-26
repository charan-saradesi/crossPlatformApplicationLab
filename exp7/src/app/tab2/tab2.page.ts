import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton
} from '@ionic/angular/standalone';

import { register } from 'swiper/element';

register();

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton
  ],
})
export class Tab2Page {

  currentIndex = 0;

  places = [
    {
      title: 'Goa Beach 🏖',
      location: 'Goa, India',
      rating: 4.5,
      description: 'Sunny beaches, parties, and water sports.'
    },
    {
      title: 'Manali Mountains 🏔',
      location: 'Himachal Pradesh',
      rating: 4.7,
      description: 'Snow, trekking, and peaceful valleys.'
    },
    {
      title: 'Mumbai City 🌆',
      location: 'Mumbai, India',
      rating: 4.3,
      description: 'Fast life, nightlife, and skyscrapers.'
    }
  ];

  onSlideChange(event: any) {
    this.currentIndex = event.target.swiper.activeIndex;
  }
}
