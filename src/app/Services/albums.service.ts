import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { albumsDetails } from '../Interfaces/albumsDetails.interface';
import { albums } from '../Interfaces/albums.interface';
import { User } from '../Interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class albumsService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/albums';

  constructor(private http: HttpClient) {}

  getAlbumsTitle(): Observable<albums[]> {
    return this.http.get<albums[]>(` ${this.apiUrl}`);
  }

  // getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users');
  // }

  getalbums(): Observable<albumsDetails[]> {
    return this.http.get<albumsDetails[]>(
      'https://jsonplaceholder.typicode.com/albums/1/photos'
    );
  }

  getAlbumDetailsById(id: number): Observable<albumsDetails[]> {
    return this.http.get<albumsDetails[]>(`${this.apiUrl}/${id}/photos`);
  }
}
