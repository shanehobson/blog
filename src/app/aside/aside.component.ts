import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit {

  @ViewChild('search') searchInputRef: ElementRef;  
  @Output() emitSearchBlogPosts=  new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  searchBlogPosts() {
      const searchCriteria = this.searchInputRef.nativeElement.value;
      this.searchInputRef.nativeElement.value = '';
      this.emitSearchBlogPosts.emit(searchCriteria);
  }

}
