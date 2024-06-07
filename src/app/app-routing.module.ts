import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CharacterDetailComponent } from './components/character/character-detail/character-detail.component';
import { CharacterComponent } from './components/character/character.component';

const routes: Routes = [
  { path: "", component: HomeComponent},
  { path: "characters", component: CharacterComponent},
  { path: "character/:id", component: CharacterDetailComponent},
  { path: "**", redirectTo: "/", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
