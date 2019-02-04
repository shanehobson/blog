import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BlogService } from '../../services/blogService';

@Component({
  selector: 'app-template1',
  templateUrl: './template1.component.html',
  styleUrls: ['./template1.component.scss']
})
export class Template1Component implements OnInit {

  @Input() blog;
  @Input() index;
  @Input() editPostMode;
  @Input() editBlogMode;
  @Output() emitEditTitle = new EventEmitter();
  @Output() emitEditItem = new EventEmitter();
  @Output() emitRemoveItem = new EventEmitter();
  @Output() emitEditDate = new EventEmitter();
  @Output() emitEditAuthor = new EventEmitter();
  @Output() emitRemoveAuthor = new EventEmitter();
  @Output() blogPostSubmitted = new EventEmitter();
  @Output() postDeleted = new EventEmitter();
  @Output() blogReset = new EventEmitter();
  isLoading = false;
  blogSubmitted = false;


  constructor(
    private blogService: BlogService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.blog);
  }

  submitBlogPost() {
    this.isLoading = true;
    this.blogService.addBlogPost(this.blog)
    .then((res) => {
      console.log(res);
      sessionStorage.clear();
      this.blog.elements = [];
      this.blog.title = 'Blog Post Title';
      this.blogPostSubmitted.emit();
      this.blogSubmitted = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 600);
      setTimeout(() => {
        this.blogSubmitted = false;
      }, 4000);
    });
  }

  onEditButtonClicked(i) {
    this.emitEditItem.emit(i);
  }

  onRemoveButtonClicked(i) {
    this.emitRemoveItem.emit(i);
  }

  onEditTitlePictureButtonClicked() {
    this.emitEditItem.emit(1000);
  }

  onRemoveTitlePictureButtonClicked() {
    this.emitRemoveItem.emit(1000);
  }

  onEditTitle() {
    this.emitEditTitle.emit();
  }

  onEditDate() {
    this.emitEditDate.emit();
  }


  onEditAuthor() {
    this.emitEditAuthor.emit();
  }

  onRemoveAuthor() {
    this.emitRemoveAuthor.emit();
  }

  onRemovePost() {
    const confirmed = window.confirm('Are you sure you want to delete this blog post?');
    if (confirmed) {
      this.blogService.removeBlogPost(this.blog._id);
      this.postDeleted.emit(this.blog._id);
    }
  }

  onEditPost() {
    console.log('Edit post called');
    this.router.navigate(['/create'], { queryParams: { id : this.blog._id }});
  }

  resetBlogPost() {
    const confirmed = window.confirm('Are you sure you want to clear all the elements of this blog post and start from scratch?')
    if (confirmed) {
      this.blogReset.emit();
    }
  }
}
