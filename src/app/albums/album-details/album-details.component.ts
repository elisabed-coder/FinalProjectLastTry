import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { albumsDetails } from 'src/app/Interfaces/albumsDetails.interface';
import { albumsService } from 'src/app/Services/albums.service';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.scss'],
})
export class AlbumDetailsComponent implements OnInit {
  allAlbumDetails: albumsDetails[] = [];

  constructor(
    private albumService: albumsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.albumService.getalbums().subscribe((response) => {
      this.allAlbumDetails = response;
    });

    this.route.params.subscribe((params) => {
      const albumId = params['id'];
      this.albumService
        .getAlbumDetailsById(albumId)
        .subscribe((albumDetails) => {
          this.allAlbumDetails = albumDetails;
        });
    });
    this.albumService
      .getPhotos()
      .subscribe((allAlbumDetails: albumsDetails[]) => {
        this.allAlbumDetails = allAlbumDetails;
      });
  }
}
