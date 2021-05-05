import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class SpotifyService {

  private spotifyUrl = 'https://api.spotify.com/v1';
  private tokenUrl = environment.tokenUrl;
  private token!: string;

  constructor(private http: HttpClient) {
    console.log('token', this.token);
    this.getAccessToken();
  }

  private async getAccessToken() {
   this.token = await this.http.get<any>(`${this.tokenUrl}`).pipe(
      map(resp => {
        console.log('getAccessToken', resp.access_token);
        return resp.access_token;
      })).toPromise();
  }

   getQuery(query: string) {
    console.log('getQuery', this.token);
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` });
    return this.http.get<any>(`${this.spotifyUrl}/${query}`, { headers });
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases?limit=20')
      .pipe(
        map((data: any) => data['albums'].items)
      );
  }

  getArtists(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist`)
      .pipe(
        map((data: any) => data['artists'].items)
      );
  }

  getArtist(id: string) {
    return this.getQuery(`artists/${id}`);
  }

  getArtistTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
      .pipe(
        map((tracks: any) => tracks['tracks'])
      );
  }

}
