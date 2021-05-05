import { SpotifyService } from 'src/app/services/spotify.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  artists: any[] = [];
  loading: boolean;

  constructor(private spotify: SpotifyService) { 
    this.loading = false;
  }

  buscar(termino: string): void {
    console.log('Buscando a ' + termino);
    this.loading = true;
    this.spotify.getArtists(termino)
      .subscribe(data => {
        console.log(data);
        this.artists = data;
        this.loading = false;
      });
  }

}
