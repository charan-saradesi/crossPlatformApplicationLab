import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { RouteReuseStrategy } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

// 🔥 Firebase imports
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';

// ✅ FIX: Firebase config must be a constant object
const firebaseConfig = {
  apiKey: "AIzaSyCZ1Ol3fB4zcPJB61xJtqo_gQq1b_8w29w",
  authDomain: "exp8-34069.firebaseapp.com",
  databaseURL: "https://exp8-34069-default-rtdb.firebaseio.com",
  projectId: "exp8-34069",
  storageBucket: "exp8-34069.appspot.com",
  messagingSenderId: "387035456855",
  appId: "1:387035456855:web:c52cb5baf376809501ca12"
};

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),

    // 🔥 Firebase setup
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideDatabase(() => getDatabase()),
  ],
});
