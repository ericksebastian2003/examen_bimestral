import { Component, OnInit } from '@angular/core';
import { EndpointsService } from 'src/app/services/endpoints.service';
//import { FirebaseService } from '../../services/firebase.service';

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
    //private firebaseService: FirebaseService // Asegúrate de inyectar correctamente el servicio de Firebase
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
  // Obtener 10 títulos de libros aleatorios
generateBooks(): void {
  const bookPromises: Promise<string>[] = [];

  for (let i = 0; i < 10; i++) {
    const bookPromise = this.endpointsService.getBook().toPromise().then(
      (response) => {
        if (response.results && response.results.length > 0) {
          return response.results[0].title; // Devuelve el título del libro
        } else {
          return 'Libro no encontrado'; // Mensaje en caso de que no haya resultados
        }
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
    this.books = titles;
    console.log('Libros generados:', this.books);
  });
}


  // Guardar libro e imagen en Firebase
  /*saveFirebaseURL(): void {
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
  }*/

}
