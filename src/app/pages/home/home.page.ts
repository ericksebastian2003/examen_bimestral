import { Component, OnInit } from '@angular/core';
import { EndpointsService } from 'src/app/services/endpoints.service';
import { FirebaseService } from '../../services/firebase.service';
/*
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  breeds: string[] = []; // Lista de razas
  selectedBreed: string | null = null; // Raza seleccionada
  dogImages: string[] = []; // Lista de imágenes de perros
  books: string[] = []; // Lista de títulos de libros
  errorMessage: string | null = null;

  constructor(
    private endpointsService: EndpointsService,
    private firebaseService: FirebaseService // Asegúrate de inyectar correctamente el servicio de Firebase
  ) {}

  ngOnInit(): void {
    this.loadBreeds();
    this.generateBooks(); // Llamar para generar libros
  }

  // Cargar la lista de razas
  loadBreeds(): void {
    this.endpointsService.getDog().subscribe(
      (response) => {
        this.breeds = Object.keys(response.message); // Obtener los nombres de las razas
        this.getRandomImages(10); // Obtener 10 imágenes aleatorias de perros
      },
      (error: any) => { // Declaración explícita del tipo error
        this.errorMessage = 'Error al cargar la lista de razas: ' + error.message;
        console.error(error);
      }
    );
  }

  // Obtener 10 imágenes aleatorias de perros
  getRandomImages(count: number): void {
    const imageRequests = [];
    
    for (let i = 0; i < count; i++) {
      if (this.breeds.length > 0) {
        this.selectedBreed = this.breeds[Math.floor(Math.random() * this.breeds.length)];
        const imageRequest = this.endpointsService.getImage(this.selectedBreed).toPromise();  // Convertir a Promise
        imageRequests.push(imageRequest);
      }
    }

    // Esperar a que todas las imágenes se hayan cargado
    Promise.all(imageRequests).then((responses) => {
      responses.forEach((response: any) => {
        this.dogImages.push(response.message); // Añadir la imagen a la lista de imágenes
      });
    }).catch((error: any) => { // Declaración explícita del tipo error
      this.errorMessage = `Error al cargar las imágenes: ${error.message}`;
      console.error(error);
    });
  }

  // Obtener 10 títulos de libros aleatorios
  generateBooks(): void {
    const bookPromises: Promise<string>[] = [];
    const uniqueBooks = new Set<string>(); // Usar un Set para evitar duplicados
  
    for (let i = 0; i < 10; i++) {
      const bookPromise = this.endpointsService.getBook().toPromise().then(
        (response) => {
          if (response.results && response.results.length > 0) {
            const title = response.results[0].title;
            if (!uniqueBooks.has(title)) { // Solo agregar si no está en el Set
              uniqueBooks.add(title);
              return title;
            }
          }
          return null; // Retornar null si el libro ya existe o no hay resultados
        },
        (error) => {
          console.error('Error al cargar el libro:', error);
          return 'Error al cargar libro';
        }
      );
  
      bookPromises.push(bookPromise);
    }
  
    // Esperar a que todas las promesas se resuelvan
    Promise.all(bookPromises).then((titles) => {
      this.books = Array.from(uniqueBooks); // Convertir el Set a un array
      console.log('Libros generados:', this.books);
    });
  }
  

  // Guardar libro e imagen en Firebase
  saveFirebaseURL(): void {
    if (this.books.length > 0 && this.dogImages.length > 0) {
      for (let i = 0; i < this.books.length; i++) {
        this.firebaseService.saveBooksandImage(this.books[i], this.dogImages[i]).then(() => {
          alert('Datos guardados con éxito');
        }).catch((error: any) => { // Declaración explícita del tipo error
          console.error("Error al guardar los datos", error);
        });
      }
    } else {
      alert('Asegúrate de que tanto el libro como las imágenes estén disponibles.');
    }
  }

}
*/


import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  breeds: string[] = [];
  selectedBreed: string | null = null;
  dogImages: string[] = [];
  books: string[] = [];
  errorMessage: string | null = null;

  constructor(
    private endpointsService: EndpointsService,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.loadBreeds();
    this.generateBooks();
  }

  // Cargar la lista de razas
  loadBreeds(): void {
    this.endpointsService.getDog().subscribe(
      (response) => {
        this.breeds = Object.keys(response.message);
        this.getRandomImages(10);
      },
      (error) => {
        this.handleError('Error al cargar la lista de razas', error);
      }
    );
  }

  // Obtener 10 imágenes aleatorias de perros
  getRandomImages(count: number): void {
    const imageRequests = [];
    for (let i = 0; i < count; i++) {
      if (this.breeds.length > 0) {
        this.selectedBreed = this.breeds[Math.floor(Math.random() * this.breeds.length)];
        imageRequests.push(lastValueFrom(this.endpointsService.getImage(this.selectedBreed)));
      }
    }

    Promise.all(imageRequests)
      .then((responses) => {
        responses.forEach((response: any) => {
          this.dogImages.push(response.message);
        });
      })
      .catch((error) => {
        this.handleError('Error al cargar imágenes de perros', error);
      });
  }

  // Obtener 10 títulos de libros aleatorios y evitar duplicados
  generateBooks(): void {
    const bookRequests: Promise<any>[] = []; // Declarar el tipo explícito como array de Promises
    const uniqueIDs = new Set<number>();
  
    while (uniqueIDs.size < 10) {
      uniqueIDs.add(Math.floor(Math.random() * 74598) + 1);
    }
  
    uniqueIDs.forEach((id) => {
      bookRequests.push(lastValueFrom(this.endpointsService.getBook(id)));
    });
  
    Promise.all(bookRequests)
      .then((responses) => {
        responses.forEach((response: any) => {
          if (response.results && response.results.length > 0) {
            this.books.push(response.results[0].title);
          }
        });
      })
      .catch((error) => {
        this.handleError('Error al cargar los títulos de los libros', error);
      });
  }
  
  
  // Guardar libros e imágenes en Firebase
  saveFirebaseURL(): void {
    if (this.books.length !== this.dogImages.length) {
      alert('Los libros y las imágenes no coinciden en cantidad.');
      return;
    }

    const savePromises = this.books.map((book, index) =>
      this.firebaseService.saveBooksandImage(book, this.dogImages[index])
    );

    Promise.all(savePromises)
      .then(() => alert('Datos guardados con éxito'))
      .catch((error) => {
        this.handleError('Error al guardar datos en Firebase', error);
      });
  }

  // Manejo de errores
  private handleError(message: string, error: any): void {
    this.errorMessage = `${message}: ${error.message}`;
    console.error(message, error);
  }
}
