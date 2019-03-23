import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { CommentBoxComponent } from './comment-box/comment-box.component';
import { CommentService } from './comment.service';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    CommentBoxComponent,
    LoginComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    routing,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [CommentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
