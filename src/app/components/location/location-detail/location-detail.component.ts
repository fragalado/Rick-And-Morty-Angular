import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from 'src/app/models/character';
import { Location } from 'src/app/models/location';
import { CharacterService } from 'src/app/services/character.service';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.css']
})
export class LocationDetailComponent implements OnInit {

  location?: Location;
  urlFrom: string = "";

  residents: Character[] = [];

  constructor(
    private route: ActivatedRoute,
    private locationService: LocationService,
    private characterService: CharacterService
  ) { }

  ngOnInit(): void {
    // Obtenemos el id de la ruta
    const id = parseInt(this.route.snapshot.paramMap.get('id') || "");

    // Obtenemos la vista de donde se ha entrado
    this.urlFrom = this.route.snapshot.queryParamMap.get('from') || "";

    // Obtenemos la localización por su id
    this.locationService.getLocation(id).subscribe((response: Location) => {
      this.location = response;
      
      this.getResidents();
    });
  }

  getResidents(){
    // Obtenemos los personajes
    this.location?.residents.forEach((resident: string) => {
      this.characterService.getCharacterByUrl(resident).subscribe((response: Character) => {
        this.residents.push(response);
      });
    });
  }
}
