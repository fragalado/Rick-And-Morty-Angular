import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from 'src/app/models/character';
import { Episode } from 'src/app/models/episode';
import { CharacterService } from 'src/app/services/character.service';
import { EpisodeService } from 'src/app/services/episode.service';

@Component({
  selector: 'app-episode-detail',
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.css'],
})
export class EpisodeDetailComponent implements OnInit {
  urlFrom: string = "";
  episode?: Episode;
  characters: Character[] = [];

  constructor(
    private episodeService: EpisodeService,
    private characterService: CharacterService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Obtenemos el id de la ruta
    const id = parseInt(this.route.snapshot.paramMap.get('id') || '');

    // Obtenemos la vista de donde se ha entrado
    this.urlFrom = this.route.snapshot.queryParamMap.get('from') || "";

    // Obtenemos el id de la ruta si lo hay
    const idRuta = this.route.snapshot.queryParamMap.get('id');
    
    if (idRuta) {
      this.urlFrom += "/" + idRuta;
    }

    // Obtenemos el episodio por su id
    this.getEpisodeById(id);
  }

  getEpisodeById(id: number) {
    this.episodeService.getEpisode(id).subscribe((response: Episode) => {
      this.episode = response;

      const match = this.episode.episode.match(/S(\d+)E(\d+)/);
      if (match) {
        const season = parseInt(match[1]);
        const episode = parseInt(match[2]);
        this.episode.episode = `Season ${season}, Episode ${episode}`;
      }

      this.getCharactersInEpisode();
    });
  }

  getCharactersInEpisode() {
    if (this.episode) {
      this.episode.characters.forEach((character: string) => {
        this.characterService
          .getCharacterByUrl(character)
          .subscribe((response: Character) => {
            this.characters.push(response);
          });
      });
    }
  }
}
