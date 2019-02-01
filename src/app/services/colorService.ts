import { Injectable } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Injectable()
export class ColorService {
 constructor(private router: Router){}

   getActivatedRoute(path){
    if (path !== '/admin') {
      if (this.router.url === path) {
        return 'selected';
     } else {
        return '$tastyGrey';
      }
    } else if (path === '/admin') {
      if (this.router.url.includes('create') || this.router.url.includes('edit') || this.router.url.includes('admin') || this.router.url.includes('profile')) {
        return 'selected';
      }
    }
   } 
}