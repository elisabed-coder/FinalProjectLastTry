import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { albumsDetails } from '../Interfaces/albumsDetails.interface';
import { albums } from '../Interfaces/albums.interface';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class albumsService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/albums';
  private apiurl2 = 'https://jsonplaceholder.typicode.com/albums/1/photos';

  constructor(private http: HttpClient) {}

  getAlbumsTitle(): Observable<albums[]> {
    return this.http.get<albums[]>(` ${this.apiUrl}`);
  }

  getalbums(): Observable<albumsDetails[]> {
    return this.http.get<albumsDetails[]>(`${this.apiurl2}`);
  }

  getAlbumDetailsById(id: number): Observable<albumsDetails[]> {
    return this.http.get<albumsDetails[]>(`${this.apiurl2}`);
  }

  // getPhotosCount(albumId: number): Observable<number> {
  //   return this.http
  //     .get<albums[]>(`${this.apiUrl}`)
  //     .pipe(map((photos) => photos.length));
  // }
}
