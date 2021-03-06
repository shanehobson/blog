import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ColorService} from './services/colorService';
import {BlogService} from './services/blogService';
import { AuthService } from './services/auth.service';

import {MatToolbarModule} from '@angular/material/toolbar'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'pitching-theory-app';
  showHamburgerMenuContent = false;
  isLoading = true;
  editPostMode = false;

  constructor(
    private router: Router,
    private colorService: ColorService,
    private blogService: BlogService,
    private authService: AuthService
  ) {

  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.editPostMode = true;
    }
    setTimeout(() => {
      this.isLoading = false;
    }, 1800)
  }

  onActivate(event) {
    window.scroll(0,0);
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

  handleDownloadsClicked() {
    this.showHamburgerMenuContent = false;
    this.router.navigate(['/', 'downloads']);
  }

  handleProfileClicked() {
    this.showHamburgerMenuContent = false;
    this.router.navigate(['/', 'profile']);
  }

  getStickyFooter() {
    if (this.router.url === '/contact') {
      return 'sticky-footer';
    } else {
      return '';
    }
  }
}
