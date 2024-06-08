import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as Aos from 'aos';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  of,
  switchMap,
} from 'rxjs';
import { Location } from 'src/app/models/location';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
})
export class LocationComponent implements OnInit {
  locations: Location[] = [];

  // Pagination variables
  prevPage?: number;
  page: number = 1;
  nextPage?: number;
  isFiltered: boolean = false;

  // Filter variables
  filterName = new FormControl('');

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    // Iniciamos AOS
    Aos.init();

    // Iniciamos el metodo filtrar por nombre
    this.filterLocationsByName();

    // Obtenemos las localizaciones
    this.getLocations();
  }

  // Método para obtener las localizaciones
  getLocations(page?: number) {
    const url = 'https://rickandmortyapi.com/api/location/?page=';
    if (page) {
      this.locationService
        .getLocationsByPage(url + page)
        .subscribe((response: any) => {
          this.nextPage = response.info?.next
            ? parseInt(response.info.next.split('=')[1])
            : undefined;
          this.prevPage = response.info?.prev
            ? parseInt(response.info.prev.split('=')[1])
            : undefined;
          this.locations = response.results;
        });
    } else {
      this.locationService.getLocations().subscribe((response: any) => {
        this.nextPage = response.info?.next
          ? parseInt(response.info.next.split('=')[1])
          : undefined;
        this.prevPage = response.info?.prev
          ? parseInt(response.info.prev.split('=')[1])
          : undefined;
        this.locations = response.results;
      });
    }
  }

  // Método para filtrar por nombre
  filterLocationsByName() {
    this.filterName.valueChanges
      .pipe(
        debounceTime(300), // Espera 300ms después del último evento
        distinctUntilChanged(), // Ignora si el nuevo valor es el mismo que el anterior
        filter((query) => {
          if (query) {
            this.isFiltered = true;
            return true;
          } else {
            this.isFiltered = false;
            return true;
          }
        }),
        switchMap((query) =>
          this.locationService.filterLocations(query!).pipe(
            catchError((error) => {
              this.locations = [];
              return of(null);
            })
          )
        )
      )
      .subscribe({
        next: (response: any) => {
          this.nextPage = response.info?.next
            ? parseInt(response.info.next.split('=')[1])
            : undefined;
          this.prevPage = response.info?.prev
            ? parseInt(response.info.prev.split('=')[1])
            : undefined;
          this.locations = response.results;
        },
      });
  }

  // Método para filtrar por page
  filterLocationsByPage(page: number) {
    this.locationService
      .filterLocations(this.filterName.value!, page)
      .subscribe({
        next: (response: any) => {
          this.nextPage = response.info?.next
            ? parseInt(response.info.next.split('=')[1])
            : undefined;
          this.prevPage = response.info?.prev
            ? parseInt(response.info.prev.split('=')[1])
            : undefined;
          this.locations = response.results;
        },
      });
  }
}
