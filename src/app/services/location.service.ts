import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {}

  getLocations() {
    return this.http.get('https://rickandmortyapi.com/api/location');
  }

  getLocation(id: number) {
    return this.http.get(`https://rickandmortyapi.com/api/location/${id}`);
  }

  getMultipleLocations(ids: number[]) {
    return this.http.get(`https://rickandmortyapi.com/api/location/${ids}`);
  }

  filterLocations(name: string) {
    return this.http.get(
      `https://rickandmortyapi.com/api/location/?name=${name}`
    );
  }
}
