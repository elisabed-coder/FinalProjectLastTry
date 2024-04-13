import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { PostsComponent } from './posts/posts.component';
import { AddPostComponent } from './posts/add-post/add-post.component';
import { EditPostComponent } from './posts/edit-post/edit-post.component';
import { AlbumsComponent } from './albums/albums.component';
import { TodoComponent } from './todo/todo.component';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommentsComponent } from './posts/edit-post/comments/comments.component';
import { AlbumDetailsComponent } from './albums/album-details/album-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    PostsComponent,
    AddPostComponent,
    EditPostComponent,
    AlbumsComponent,
    TodoComponent,
    NotFoundComponentComponent,
    CommentsComponent,
    AlbumDetailsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
