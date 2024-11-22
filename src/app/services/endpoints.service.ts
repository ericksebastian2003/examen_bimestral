import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EndpointsService {
  private baseUrlDog = 'https://dog.ceo/api/breeds/list/all';
  private baseUrlImage = 'https://dog.ceo/api/breed';
  private baseUrlBook = 'https://gutendex.com/books/';

  constructor(private http: HttpClient) {}

  // Obtener la lista de razas de perros
  getDog(): Observable<any> {
    return this.http.get(this.baseUrlDog);
  }

  // Obtener una imagen aleatoria de una raza específica
  getImage(breed: string): Observable<any> {
    return this.http.get(`${this.baseUrlImage}/${breed}/images/random`);
  }

  // Obtener información de un libro aleatorio
  getBook(): Observable<any> {
    const randomNumber = Math.floor(Math.random() * 74598) + 1; // Número aleatorio entre 1 y 74598 (el total de libros)
    return this.http.get(`${this.baseUrlBook}?ids=${randomNumber}`);
  }
}
