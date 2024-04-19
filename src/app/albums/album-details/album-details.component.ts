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
    const albumId = parseInt(this.route.snapshot.paramMap.get('id')!);

    this.albumService.getPhotosByAlbumId(albumId).subscribe((photos) => {
      this.allAlbumDetails = photos;
    });
  }
}
