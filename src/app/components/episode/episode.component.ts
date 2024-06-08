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
import { Episode } from 'src/app/models/episode';
import { EpisodeService } from 'src/app/services/episode.service';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.css'],
})
export class EpisodeComponent implements OnInit {
  episodes: Episode[] = [];

  // Pagination variables
  prevPage?: number;
  page: number = 1;
  nextPage?: number;
  isFiltered: boolean = false;

  // Filter variables
  filterName = new FormControl('');

  constructor(private episodeService: EpisodeService) {}

  ngOnInit(): void {
    // Inicializamos AOS
    Aos.init();

    // Iniciamos el metodo filtrar por nombre
    this.filterEpisodesByName();

    // Obtenemos los episodios
    this.getEpisodes();
  }

  // Método para obtener los episodios
  getEpisodes(page?: number) {
    const url = 'https://rickandmortyapi.com/api/episode/?page=';
    if (page) {
      this.episodeService
        .getEpisodesByPage(url + page)
        .subscribe((response: any) => {
          this.nextPage = response.info?.next
            ? parseInt(response.info.next.split('=')[1])
            : undefined;
          this.prevPage = response.info?.prev
            ? parseInt(response.info.prev.split('=')[1])
            : undefined;
          this.episodes = response.results;
        });
    } else {
      this.episodeService.getEpisodes().subscribe((response: any) => {
        this.nextPage = response.info?.next
          ? parseInt(response.info.next.split('=')[1])
          : undefined;
        this.prevPage = response.info?.prev
          ? parseInt(response.info.prev.split('=')[1])
          : undefined;
        this.episodes = response.results;

        this.episodes.forEach((episode: Episode) => {
          const match = episode.episode.match(/S(\d+)E(\d+)/);
          if (match) {
            const season = parseInt(match[1]);
            const episodeNumber = parseInt(match[2]);
            episode.episode = `Season ${season}, Episode ${episodeNumber}`;
          }
        });

        // Ordenamos los episodios por la fecha de lanzamiento
        this.episodes.sort((a, b) => {
          return (
            new Date(a.air_date).getTime() - new Date(b.air_date).getTime()
          );
        });
      });
    }
  }

  filterEpisodesByName() {
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
          this.episodeService.filterEpisodes(query!).pipe(
            catchError((error) => {
              this.episodes = [];
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
          this.episodes = response.results;
        },
      });
  }

  filterEpisodesByPage(page: number) {
    this.episodeService.filterEpisodes(this.filterName.value!, page).subscribe({
      next: (response: any) => {
        this.nextPage = response.info?.next
          ? parseInt(response.info.next.split('=')[1])
          : undefined;
        this.prevPage = response.info?.prev
          ? parseInt(response.info.prev.split('=')[1])
          : undefined;
        this.episodes = response.results;
      },
      error: (error: any) => {
        console.log('Ha ocurrido un error');
      },
    });
  }
}
