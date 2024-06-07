import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '../models/character';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  constructor(private http: HttpClient) {}

  // Obtener todos los personajes
  getCharacters() {
    return this.http.get('https://rickandmortyapi.com/api/character');
  }

  getCharactersByPage(url: string) {
    return this.http.get(url);
  }

  // Obtener un solo personaje
  getCharacter(id: number) {
    return this.http.get(
      `https://rickandmortyapi.com/api/character/${id}`
    ) as Observable<Character>;
  }

  // Obtener multiples personajes
  getMultipleCharacters(ids: number[]) {
    return this.http.get(`https://rickandmortyapi.com/api/character/${ids}`);
  }

  // Filtrar personajes
  filterCharacters(name: string, page?: number) {    
    return !page
      ? this.http.get(`https://rickandmortyapi.com/api/character/?name=${name}`)
      : this.http.get(
          `https://rickandmortyapi.com/api/character/?page=${page}&name=${name}`
        );
  }
}
