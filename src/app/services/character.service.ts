import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  constructor(private http: HttpClient) {}

  // Obtener todos los personajes
  getCharacters() {
    return this.http.get('https://rickandmortyapi.com/api/character');
  }

  // Obtener un solo personaje
  getCharacter(id: number) {
    return this.http.get(`https://rickandmortyapi.com/api/character/${id}`);
  }

  // Obtener multiples personajes
  getMultipleCharacters(ids: number[]) {
    return this.http.get(`https://rickandmortyapi.com/api/character/${ids}`);
  }

  // Filtrar personajes
  filterCharacters(name: string) {
    return this.http.get(
      `https://rickandmortyapi.com/api/character/?name=${name}`
    );
  }
}
