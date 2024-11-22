/*
import { Injectable } from '@angular/core';
import { Database, ref, set } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private db: Database) {}

  // Método para guardar datos en Firebase
  saveBooksandImage(bookTitle: string, imageUrl: string): Promise<void> {
    const dataRef = ref(this.db, `books/${Date.now()}`); // Ruta en la base de datos
    return set(dataRef, { bookTitle, imageUrl });
  }
}
*/
import { Injectable } from '@angular/core';
import { Database, ref, set } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private db: Database) {}

  // Método para guardar datos en Firebase
  saveBooksandImage(bookTitle: string, imageUrl: string): Promise<void> {
    const dataRef = ref(this.db, `books/${Date.now()}`);
    return set(dataRef, { bookTitle, imageUrl });
  }
}
