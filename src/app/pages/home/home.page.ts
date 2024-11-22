import { Component, OnInit } from '@angular/core';
import { EndpointsService } from 'src/app/services/endpoints.service';
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  breeds: string[] = []; // Lista de razas
  selectedBreed: string | null = null; // Raza seleccionada
  dogImage: string | null = null; // Imagen del perro
  errorMessage: string | null = null;
  books: string | null=null;

  constructor(private endpointsService: EndpointsService) {}

  ngOnInit(): void {
    this.loadBreeds();
  }

  // Cargar la lista de razas
  loadBreeds(): void {
    this.endpointsService.getDog().subscribe(
      (response) => {
        this.breeds = Object.keys(response.message); // Obtener los nombres de las razas
        this.getRandomImage(); // Obtener una imagen aleatoria después de cargar las razas
      },
      (error) => {
        this.errorMessage = 'Error al cargar las razas de perros.';
        console.error(error);
      }
    );
  }

  // Seleccionar una raza aleatoria y obtener su imagen
  getRandomImage(): void {
    if (this.breeds.length > 0) {
      this.selectedBreed = this.breeds[Math.floor(Math.random() * this.breeds.length)];
      this.endpointsService.getImage(this.selectedBreed).subscribe(
        (response) => {
          this.dogImage = response.message; // Imagen de la raza seleccionada
        },
        (error) => {
          this.errorMessage = `Error al cargar la imagen de la raza ${this.selectedBreed}.`;
          console.error(error);
        }
      );
    } else {
      this.errorMessage = 'No se encontraron razas disponibles.';
    }
  }

  generateBooks() : void{
    this.endpointsService.getBook().subscribe(
      (response) =>{
        this.books = response;

  },
  (error)=>{
    this.errorMessage = 'No existe el libro';

  }
  );
}


}
