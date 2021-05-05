import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  newSongs: any[] = [];
  loading: boolean;
  error: boolean;
  errorMessage = "Error";

  constructor(private spotifyService: SpotifyService) {
    this.loading = true;
    this.error = false;
    this.getData();
   }

  ngOnInit(): void {
    
  }

  private getData() {{
    this.spotifyService.getNewReleases().subscribe((data: any) => {
      //console.log(data);
      this.newSongs = data;
      this.loading = false;
    }, (errorServicio) => {
      this.loading = false;
      this.error = true;
      //console.log(errorServicio);
      this.errorMessage = errorServicio.error.error.message;
    });
  }}

}
