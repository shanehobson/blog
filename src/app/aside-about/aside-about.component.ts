import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aside-about',
  templateUrl: './aside-about.component.html',
  styleUrls: ['./aside-about.component.scss']
})
export class AsideAboutComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
  
  }

  handleAboutClicked() {
    this.router.navigate(['/', 'about']);
  }
}

