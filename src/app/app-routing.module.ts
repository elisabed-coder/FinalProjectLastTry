import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { PostsComponent } from './posts/posts.component';
import { EditPostComponent } from './posts/edit-post/edit-post.component';
import { AlbumsComponent } from './albums/albums.component';
import { TodoComponent } from './todo/todo.component';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';
import { AlbumDetailsComponent } from './albums/album-details/album-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    component: MainComponent,
  },
  {
    path: 'posts',
    component: PostsComponent,
  },
  { path: 'posts/:id', component: EditPostComponent },

  {
    path: 'albums',
    component: AlbumsComponent,
  },
  {
    path: 'albums/:id',
    component: AlbumDetailsComponent,
  },
  {
    path: 'todos',
    component: TodoComponent,
  },
  {
    path: '**',
    component: NotFoundComponentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
