import { SpotifyService } from 'src/app/services/spotify.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent {

  artista: any;
  topTracks: any[] = [];
  loading = false;

  constructor(private router: ActivatedRoute, private spotify: SpotifyService) {
    this.router.params.subscribe(params => {
      console.log(params);
      this.getArtista(params['id']);
      this.getTopTracks(params['id']);
    });
  }

  getArtista(id: string) {
    this.loading = true;
    this.spotify.getArtist(id).subscribe(artista => {
      console.log("artista", artista);
      this.artista = artista;
      this.loading = false;
    })
  }

  getTopTracks(id: string) {
    this.spotify.getArtistTopTracks(id).subscribe(topTracks => {
      console.log(topTracks);
      this.topTracks = topTracks;
    });
  }

}
