import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { concatMap, map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class SpotifyService {

  private spotifyUrl = 'https://api.spotify.com/v1';
  private tokenUrl = environment.tokenUrl;
  private token$ = this.http.get<any>(`${this.tokenUrl}`).pipe(map(resp => resp.access_token));

  constructor(private http: HttpClient) {
  }

  getQuery(query: string) {
    return this.token$.pipe(
      concatMap(token => {
        //console.log('getQuery', token);
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
        return this.http.get<any>(`${this.spotifyUrl}/${query}`, { headers });
      })
    );
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
