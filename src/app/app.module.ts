import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { CharacterComponent } from './components/character/character.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CharacterDetailComponent } from './components/character/character-detail/character-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationComponent } from './components/location/location.component';
import { LocationDetailComponent } from './components/location/location-detail/location-detail.component';
import { EpisodeComponent } from './components/episode/episode.component';
import { EpisodeDetailComponent } from './components/episode/episode-detail/episode-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CharacterComponent,
    NavbarComponent,
    CharacterDetailComponent,
    LocationComponent,
    LocationDetailComponent,
    EpisodeComponent,
    EpisodeDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
