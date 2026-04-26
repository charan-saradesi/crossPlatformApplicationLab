import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonInput, IonIcon, IonSpinner
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addOutline, apertureOutline, radioOutline,
  cubeOutline, imageOutline, earthOutline
} from 'ionicons/icons';

import { DataService, Item } from '../services/data.service';
import { Camera, GalleryPhoto } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';

interface Position {
  coords: {
    latitude: number;
    longitude: number;
    accuracy: number;
  };
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, DatePipe, DecimalPipe,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonInput, IonIcon, IonSpinner
  ],
})
export class HomePage implements OnInit {

  private dataService = inject(DataService);

  newItem: string = '';
  items: Item[] = [];
  photo: string | null = null;
  location: Position | null = null;
  loadingLocation = false;

  constructor() {
    addIcons({
      addOutline, apertureOutline, radioOutline,
      cubeOutline, imageOutline, earthOutline
    });
  }

  ngOnInit() {
    this.dataService.getItems().subscribe(items => {
      this.items = items;
    });
  }

  async saveItem() {
    const name = this.newItem.trim();
    if (!name) return;
    await this.dataService.addItem(name);
    this.newItem = '';
  }

  async takePicture() {
    try {
      const result = await Camera.pickImages({ limit: 1 });
      const image: GalleryPhoto = result.photos[0];
      this.photo = image.webPath ?? null;
    } catch (err) {
      console.error('Camera error:', err);
    }
  }

  async getLocation() {
    this.loadingLocation = true;
    try {
      const pos = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000
      });
      this.location = {
        coords: {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        }
      };
    } catch (err) {
      console.error('Geolocation error:', err);
    } finally {
      this.loadingLocation = false;
    }
  }
}
