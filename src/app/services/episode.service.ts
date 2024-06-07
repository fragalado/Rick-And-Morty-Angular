import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Episode } from '../models/episode';

@Injectable({
  providedIn: 'root',
})
export class EpisodeService {
  constructor(private http: HttpClient) {}

  getEpisodes() {
    return this.http.get('https://rickandmortyapi.com/api/episode');
  }

  getEpisode(id: number) {
    return this.http.get(`https://rickandmortyapi.com/api/episode/${id}`) as Observable<Episode>;
  }

  getEpisodeByUrl(url: string) {
    return this.http.get(url) as Observable<Episode>;
  }

  getMultipleEpisodes(ids: number[]) {
    return this.http.get(`https://rickandmortyapi.com/api/episode/${ids}`);
  }

  filterEpisodes(name: string) {
    return this.http.get(
      `https://rickandmortyapi.com/api/episode/?name=${name}`
    );
  }
}
