import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '../models/location';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {}

  getLocations() {
    return this.http.get('https://rickandmortyapi.com/api/location');
  }

  getLocationsByPage(url: string) {
    return this.http.get(url);
  }

  getLocation(id: number) {
    return this.http.get(
      `https://rickandmortyapi.com/api/location/${id}`
    ) as Observable<Location>;
  }

  getMultipleLocations(ids: number[]) {
    return this.http.get(`https://rickandmortyapi.com/api/location/${ids}`);
  }

  filterLocations(name: string, page?: number) {
    return !page
      ? this.http.get(`https://rickandmortyapi.com/api/location/?name=${name}`)
      : this.http.get(
          `https://rickandmortyapi.com/api/location/?page=${page}&name=${name}`
        );
  }
}
