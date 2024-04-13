import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { albumsService } from '../Services/albums.service';
import { albums } from '../Interfaces/albums.interface';
import { User } from '../Interfaces/user.interface';
import { Router } from '@angular/router';
import { postService } from '../Services/posts.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss'],
})
export class AlbumsComponent implements OnInit {
  allAlbums: albums[] = [];
  allUsers: User[] = [];
  constructor(
    private albumService: albumsService,
    private postsService: postService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.albumService.getAlbumsTitle().subscribe((response) => {
      this.allAlbums = response;
    });
    this.postsService.getUsers().subscribe((response) => {
      this.allUsers = response;
    });
  }

  getUserById(userId: number): User | undefined {
    return this.allUsers.find((user) => user.id === userId);
  }

  navigateToalbumDetails(albumId: number) {
    this.router.navigate(['/albums', albumId]);
  }
}
