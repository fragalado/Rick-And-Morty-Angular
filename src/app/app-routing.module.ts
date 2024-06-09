import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CharacterDetailComponent } from './components/character/character-detail/character-detail.component';
import { CharacterComponent } from './components/character/character.component';
import { LocationComponent } from './components/location/location.component';
import { LocationDetailComponent } from './components/location/location-detail/location-detail.component';
import { EpisodeComponent } from './components/episode/episode.component';
import { EpisodeDetailComponent } from './components/episode/episode-detail/episode-detail.component';

const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "characters", component: CharacterComponent},
  { path: "character/:id", component: CharacterDetailComponent},
  { path: "locations", component: LocationComponent},
  { path: "location/:id", component: LocationDetailComponent},
  { path: "episodes", component: EpisodeComponent},
  { path: "episode/:id", component: EpisodeDetailComponent},
  { path: ":status", component: HomeComponent}, // Lo dejamos al final para que no se sobreescriba en las otras
  { path: "**", redirectTo: "/", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
