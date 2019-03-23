import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 public isLoggedin = false;
  constructor(private router: Router) { }

  ngOnInit() {
   if(!localStorage.getItem('userName')) {
  	this.isLoggedin = false;
  } else {
  	this.isLoggedin = true;
  }
  }

  logoutUser(){
    localStorage.clear();
    this.router.navigate(['']);
    window.location.reload();
  }

}
