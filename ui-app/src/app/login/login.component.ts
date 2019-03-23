import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentService } from '../comment.service';
import { Router } from '@angular/router';
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private clientId:string = '436151005039-j7f4cq5uoaj7h9r2ov5t0ning38ag39p.apps.googleusercontent.com';
  
  private scope = [
    'profile',
    'email',
  ].join(' ');

  public auth2: any;
  constructor(private element: ElementRef, private commentService: CommentService,
  private router: Router) { }

  public googleInit() {
    let that = this;
    gapi.load('auth2', function () {
      that.auth2 = gapi.auth2.init({
        client_id: that.clientId,
        cookiepolicy: 'single_host_origin',
        scope: that.scope
      });
      that.attachSignin(that.element.nativeElement.lastChild);
    });
  }
  public attachSignin(element) {
    let that = this;
    this.auth2.attachClickHandler(element, {},
      function (googleUser) {

        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        const userobj = {
          'user': profile.getName(),
          'email': profile.getEmail(),
          'token':googleUser.getAuthResponse().id_token,
          'userId': profile.getId()
        }
      that.commentService.loginUser(userobj)
      .subscribe(
        (data) => {
          that.setCookies(data);
          that.router.navigate(['/comments']);
          window.location.reload();
        });
      }, function (error) {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }
  
  setCookies(data) {
    const pointer = this;
    localStorage.setItem('userId', data.user.userId);
    localStorage.setItem('emailId', data.user.email);
    localStorage.setItem('userName', data.user.user);
    localStorage.setItem('accessToken', data.user.token);
  }

  ngOnInit() {
  this.googleInit();
  }
 ngAfterViewInit() {
    
  }
}
