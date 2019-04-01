import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private ngZone: NgZone) { }

  ngOnInit() {

  }

  logoutUser(){
    localStorage.clear();
    this.ngZone.run(() => this.router.navigate(['']));
  }
}
