import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { albumsDetails } from '../Interfaces/albumsDetails.interface';
import { albums } from '../Interfaces/albums.interface';
import { User } from '../Interfaces/user.interface';
import { Observable, ObservableInput, catchError } from 'rxjs';

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
    return this.http.get<albumsDetails[]>('${this.apiUrl2}');
  }

  getAlbumDetailsById(id: number): Observable<albumsDetails[]> {
    return this.http.get<albumsDetails[]>(`${this.apiurl2}/${id}/photos`);
  }

  // getPhotosCount(albumId: number): Observable<albums[]> {
  //   this.http
  //     .get<albums[]>(`${this.apiUrl}/albums/${albumId}/photos`)
  //     .pipe(catchError(handlefunction));
  // }
}
