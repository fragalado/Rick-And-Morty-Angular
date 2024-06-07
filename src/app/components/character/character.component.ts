import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character';
import { CharacterService } from 'src/app/services/character.service';
import * as AOS from 'aos';
import { FormControl } from '@angular/forms';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  of,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css'],
})
export class CharacterComponent implements OnInit {
  characters: Character[] = [];

  // Pagination variables
  prevPage?: number;
  page: number = 1;
  nextPage?: number;
  isFiltered: boolean = false;

  // Filter variables
  filterName = new FormControl('');

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    // Iniciamos AOS
    AOS.init();

    // Iniciamos el metodo filtrar por nombre
    this.filterCharactersByName();

    // Obtenemos los personajes
    this.getCharacters();
  }

  // Método para obtener los personajes
  getCharacters(page?: number) {
    const url = 'https://rickandmortyapi.com/api/character/?page=';
    if (page) {
      this.characterService
        .getCharactersByPage(url + page)
        .subscribe((response: any) => {
          this.nextPage = response.info?.next
            ? parseInt(response.info.next.split('=')[1])
            : undefined;
          this.prevPage = response.info?.prev
            ? parseInt(response.info.prev.split('=')[1])
            : undefined;

          // Obtenemos la lista de personajes
          const results = response.results;
          this.characters = results;
        });
    } else {
      this.characterService
        .getCharactersByPage(url + this.page)
        .subscribe((response: any) => {
          this.nextPage = response.info?.next
            ? parseInt(response.info.next.split('=')[1])
            : undefined;
          this.prevPage = response.info?.prev
            ? parseInt(response.info.prev.split('=')[1])
            : undefined;

          // Obtenemos la lista de personajes
          const results = response.results;
          this.characters = results;
        });
    }
  }

  filterCharactersByName() {
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
          this.characterService.filterCharacters(query!).pipe(
            catchError((error) => {
              this.characters = [];
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

          const results = response.results;
          this.characters = results;
        },
        error: (error: any) => {
          console.log('Ha ocurrido un error');
          this.characters = [];
        },
      });
  }

  filterCharactersByPage(page: number) {
    this.characterService
      .filterCharacters(this.filterName.value!, page)
      .subscribe({
        next: (response: any) => {
          this.nextPage = response.info?.next
            ? parseInt(response.info.next.split('=')[1])
            : undefined;
          this.prevPage = response.info?.prev
            ? parseInt(response.info.prev.split('=')[1])
            : undefined;

          const results = response.results;
          this.characters = results;
        },
        error: (error: any) => {
          console.log('Ha ocurrido un error');
        },
      });
  }
}
