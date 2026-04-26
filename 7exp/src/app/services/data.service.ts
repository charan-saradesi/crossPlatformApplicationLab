import { Injectable, inject } from '@angular/core';
import { Database, ref, push, onValue } from '@angular/fire/database';
import { Observable } from 'rxjs';

export interface Item {
  id?: string;
  name: string;
  timestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // ✅ FIX: use inject() instead of constructor injection
  private db = inject(Database);

  addItem(name: string) {
    const itemsRef = ref(this.db, 'items');

    return push(itemsRef, {
      name,
      timestamp: Date.now()
    });
  }

  getItems(): Observable<Item[]> {
    return new Observable(observer => {
      const itemsRef = ref(this.db, 'items');

      const unsubscribe = onValue(itemsRef, snapshot => {
        const data = snapshot.val();

        const items: Item[] = data
          ? Object.entries(data).map(([key, val]: any) => ({
            id: key,
            ...val
          }))
          : [];

        observer.next(items);
      });

      // optional cleanup (VERY important)
      return () => unsubscribe();
    });
  }
}
