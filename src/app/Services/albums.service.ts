import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { albumsDetails } from '../Interfaces/albumsDetails.interface';
import { albums } from '../Interfaces/albums.interface';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class albumsService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/albums';
  private apiurl2 = 'https://jsonplaceholder.typicode.com/albums/1/photos';

  constructor(private http: HttpClient) {}

  getAlbumsTitle(): Observable<albums[]> {
    return this.http
      .get<albums[]>(` ${this.apiUrl}`)
      .pipe(catchError(this.handleError));
  }

  getalbums(): Observable<albumsDetails[]> {
    return this.http
      .get<albumsDetails[]>(`${this.apiurl2}`)
      .pipe(catchError(this.handleError));
  }

  getAlbumDetailsById(id: number): Observable<albumsDetails[]> {
    return this.http
      .get<albumsDetails[]>(`${this.apiurl2}`)
      .pipe(catchError(this.handleError));
  }

  getPhotosCount(albumId: number): Observable<number> {
    return this.http
      .get<albums[]>(`${this.apiUrl}`)
      .pipe(map((photos) => photos.length));
  }

  getPhotos(): Observable<albumsDetails[]> {
    return this.http.get<albumsDetails[]>(
      'https://jsonplaceholder.typicode.com/photos'
    );
  }

  getPhotosByAlbumId(albumId: number): Observable<albumsDetails[]> {
    return this.http.get<albumsDetails[]>(
      `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A clint-side or network error occurred. Handle it accordingly
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
