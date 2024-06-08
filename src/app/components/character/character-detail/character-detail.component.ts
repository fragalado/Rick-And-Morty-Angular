import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from 'src/app/models/character';
import { Episode } from 'src/app/models/episode';
import { CharacterService } from 'src/app/services/character.service';
import { EpisodeService } from 'src/app/services/episode.service';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {

  id: number = 0;
  urlFrom: string = "";
  character?: Character;
  episodes: Episode[] = [];

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService,
    private episodeService: EpisodeService
  ) { }

  ngOnInit(): void {
    // Obtenemos el id de la ruta
    this.id = parseInt(this.route.snapshot.paramMap.get('id') || "");

    // Obtenemos la vista de donde se ha entrado
    this.urlFrom = this.route.snapshot.queryParamMap.get('from') || "";

    // Obtenemos el id de la ruta si lo hay
    const idRuta = this.route.snapshot.queryParamMap.get('id');
    
    if (idRuta) {
      this.urlFrom += "/" + idRuta;
    }

    // Obtenemos el personaje por su id
    this.characterService.getCharacter(this.id).subscribe((response: Character) => {
      this.character = response;

      // Obtenemos los episodios
      this.character.episode.forEach((episode: string) => {
        this.episodeService.getEpisodeByUrl(episode).subscribe((response: Episode) => {
          this.episodes.push(response);
        });
      });

      // Ordenamos los episodios por la fecha de lanzamiento
      this.episodes.sort((a, b) => {
        const dateA = new Date(a.air_date);
        const dateB = new Date(b.air_date);
        return dateA.getTime() - dateB.getTime();
      });
    });
  }
}
