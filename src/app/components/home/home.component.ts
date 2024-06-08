import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character';
import { Episode } from 'src/app/models/episode';
import { Location } from 'src/app/models/location';
import { CharacterService } from 'src/app/services/character.service';
import { LocationService } from 'src/app/services/location.service';
import * as AOS from 'aos';
import { EpisodeService } from 'src/app/services/episode.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  characters: Character[] = [];
  locations: Location[] = [];
  episodes: Episode[] = [];

  constructor(
    private characterService: CharacterService,
    private locationService: LocationService,
    private episodeService: EpisodeService
  ) {}

  ngOnInit(): void {
    // Iniciamos AOS
    AOS.init();

    // Obtenemos los personajes
    this.characterService.getCharacters().subscribe((response: any) => {
      // Obtenemos la lista de personajes
      const results = response.results.slice(0, 8);

      // Recorremos la lista de personajes
      results.forEach((character: Character) => {
        // Aniadimos el personaje a la lista
        this.characters.push(character);
      });
    });

    // Obtenemos las localizaciones
    this.locationService.getLocations().subscribe((response: any) => {
      // Obtenemos la lista de localizaciones
      const results = response.results.slice(0, 8);

      // Recorremos la lista de localizaciones
      results.forEach((location: Location) => {
        // Aniadimos la localización a la lista
        this.locations.push(location);
      });
    });

    // Obtenemos los episodios
    this.episodeService.getEpisodes().subscribe((response: any) => {
      // Obtenemos la lista de localizaciones
      const results = response.results.slice(0, 8);

      // Recorremos la lista de localizaciones
      results.forEach((episode: Episode) => {
        // Aniadimos la localización a la lista
        this.episodes.push(episode);
      });
    });
  }
}
