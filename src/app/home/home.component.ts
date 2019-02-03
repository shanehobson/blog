import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import * as moment from 'moment';
import { BlogService } from '../services/blogService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  blogs;
  sortedBlogs;
  sortedAndFilteredBlogs;
  editBlogMode = false;
  noResults = false;
  showResults = false;
  isLoading;

  constructor(
    private blogService: BlogService,
    private router: Router
  ) { }

  ngOnInit() {
    const route = this.router.url;
    if (route.indexOf('edit') > -1) {
      this.editBlogMode = true;
    }
    this.blogService.getBlogs()
    .then((data) => {
      this.blogs = data;
      this.sortedBlogs = this.sortBlogPosts(this.blogs);
      this.sortedAndFilteredBlogs = this.sortedBlogs
    });
  }

  sortBlogPosts(blogs) {
    const sortedBlogs = blogs.sort((a, b) => {
      const dateA = moment(a.date);
      const dateB = moment(b.date);
        return dateB.valueOf() - dateA.valueOf();
    });
    return sortedBlogs;
  }

  
  filterBlogPosts(criteria) { // takes in a lower case string
    const filteredPosts = [];
    this.sortedBlogs.forEach(post => {
      let match = false;
      const title = post.title.toLowerCase();
      const author = post.author.toLowerCase();
      const imageSubtitle = post.imageSubtitle.toLowerCase();
      if (title.indexOf(criteria) > -1 || author.indexOf(criteria) > -1 || imageSubtitle.indexOf(criteria) > -1) {
        match = true;
      } else {
        post.elements.forEach(el => {
          const content = el.content.toLowerCase();
          if (content.indexOf(criteria) > -1) {
            match = true;
          }
        })
      }
      if (match) {
        filteredPosts.push(post);
      }
    });
    console.log(filteredPosts);
    return filteredPosts;
  }

  searchBlogPosts(event) {
    console.log(event);
    this.isLoading = true;
    const criteria = event.toLowerCase();
    const filteredBlogPosts = this.filterBlogPosts(criteria);
    this.sortedAndFilteredBlogs = this.sortBlogPosts(filteredBlogPosts);
    this.showResults = true;
    this.isLoading = false;
  }

  unfilterResults() {
    this.sortedAndFilteredBlogs = this.sortedBlogs;
    this.showResults = false;
  }

  reloadBlogPosts(id) {
    console.log('entered reload blog posts', id);
    this.isLoading = true;
    let returnArray = [];
    this.sortedAndFilteredBlogs.forEach((el, i) => {
      if (el['_id'] !== id) {
        returnArray.push(el);
      }
    });
    this.sortedAndFilteredBlogs = returnArray;
  }

}
