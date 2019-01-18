import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ColorService} from './services/colorService'
import {BlogService} from './services/blogService'

import {MatToolbarModule} from '@angular/material/toolbar'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pitching-theory-app';
  showHamburgerMenuContent = false;

  constructor(
    private router: Router,
    private colorService: ColorService,
    private blogService: BlogService
  ) {

  }

  ngOnInit() {
    
  }

  toggleHamburgerMenu() {
    this.showHamburgerMenuContent = !this.showHamburgerMenuContent;
  }

  handleHomeClicked() {
    this.showHamburgerMenuContent = false;
    this.router.navigate(['/']);
  }

  handleAboutClicked() {
    this.showHamburgerMenuContent = false;
    this.router.navigate(['/', 'about']);
  }

  handleContactClicked() {
    this.showHamburgerMenuContent = false;
    this.router.navigate(['/', 'contact']);
  }
}