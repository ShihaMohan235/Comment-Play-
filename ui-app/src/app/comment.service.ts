import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { environment } from '../environments/environment';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})

export class CommentService {

  headers: Headers = new Headers({ 'Content-Type': 'application/json' });
  options: RequestOptions = new RequestOptions({ headers: this.headers });

  constructor(
    private http: Http
  ) { }

  // Function to create a new comment
  newComment(comment) {
    return this.http.post(environment.API_BASE_URL + 'comments/newComment', comment, this.options)
    .map((res) => res.json());
  }

  getAllcomments() {
     return this.http.get(environment.API_BASE_URL + 'comments/allComments', this.options)
    .map((res) => res.json());	
  }

  likeCommentbyuser(userName, date) {
  	const user = {
      'user': userName,
      'date': date
    };
    return this.http.put(environment.API_BASE_URL + 'comments/likeComment', user, this.options)
    .map((res) => res.json());	
  }

  dislikeCommentbyuser(userName, date) {
  	const user = {
      'user': userName,
      'date': date
    };
    return this.http.put(environment.API_BASE_URL + 'comments/dislikeComment', user, this.options)
    .map((res) => res.json());	
  }

  loginUser(userobj) {
    return this.http.post(environment.API_BASE_URL + 'authentication/login', userobj, this.options)
    .map((res) => res.json());	
  }
}