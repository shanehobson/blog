import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BlogService } from '../services/blogService';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit, OnDestroy {

  isLoading = false;
  titleControlPristine = true;
  blogElementAdded = 0;

  // Create
  createPostForm: FormGroup;
  hasPicture = false;
  showPicture = false;
  date;
  year;
  month;
  day;
  blog = {
    type: '2',
    title: 'Blog Post Title',
    author: 'Cameron Hobson',
    date: '',
    imageUrl: '',
    imageSubtitle: '',
    elements: []
  };
  inputField = [];
  index = 0;
  noTitlePicture = true;
  editTitleMode = true;
  editTitlePicture = false;
  editDateMode = false;
  editAuthorMode = false;

  months = ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private router: Router,
    private route: ActivatedRoute
  ) {
      this.createPostForm = this.fb.group({
      title: ['', Validators.required],
      hasPicture: ['No'],
      imageUrl: ['']
    });
   }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['id'] && !this.blog['_id']) {
        console.log('entered get blog post front end')
        this.blogService.getBlogPost(params['id']).then((res) => {
          console.log(res);
          for (let item in res) {
            if (res[item] === 'elements') {
             res[item].forEach(el => {
               this.blog.elements.unshift(el);
             })
            } else {
              this.blog[item] = res[item];
            }
          }
          this.saveDataToSessionStorage();
        })
      }
   });
    this.getDataFromSessionStorage().then(() => {
      this.setDateInfo();
      if (this.blog.imageUrl === '') {
        this.hasPicture = false;
        this.noTitlePicture = true;
      } else {
        this.hasPicture = true;
        this.noTitlePicture = false;
      }
    });
  }

  ngOnDestroy() {
    this.saveDataToSessionStorage();
  }
  
  blogPostSubmitted() {
    sessionStorage.clear();
    this.blog = {
      type: '2',
      title: 'Blog Post Title',
      author: 'Cameron Hobson',
      date: '',
      imageUrl: '',
      imageSubtitle: '',
      elements: []
    };
    this.setDateInfo();
    this.inputField = [];
    this.saveDataToSessionStorage();
  }

  setDateInfo() {
    const now = Date.now();
    const todaysDate = new Date(now);
    this.date = todaysDate;
    this.year = todaysDate.getFullYear();
    this.day = todaysDate.getDate();
    const month = todaysDate.getMonth();
    this.month = this.months[month];
    this.blog.date = `${this.month} ${this.day}, ${this.year}`;
  }

  addDate(event) {
    this.blog.date = event;
    this.editDateMode = false;
    this.saveDataToSessionStorage();
  }

  editDate() {
    this.editDateMode = true;
  }

  removeTitle() {
    this.editTitleMode = false;
  }

  removeDate() {
    this.editDateMode = false;
  }

  addAuthor(event) {
    this.blog.author = event;
    this.editAuthorMode = false;
    this.saveDataToSessionStorage();
  }

  editAuthor() {
    this.editAuthorMode = true;
  }

  removeAuthor() {
    this.editAuthorMode = false;
    this.blog.author = '';
    this.saveDataToSessionStorage();
  }
  addTitle(form) {
    const title = form.controls['title'].value;
    this.blog.title = title;
    form.controls['title'].setValue('');
    this.editTitleMode = false;
    this.saveDataToSessionStorage();
  }

  onPictureSelectChange(form) {
    const hasPicture = form.controls['hasPicture'].value.toLowerCase();
    if (hasPicture === 'yes') {
      this.hasPicture = true;
      this.showPicture = true;
    } else {
      this.hasPicture = false;
      this.showPicture = false;
    }
    this.saveDataToSessionStorage();
  }

  addInputField(type, content, i) {
    if (this.inputField.length === 0) {
      this.inputField.push({
        type,
        content: content ? content : '',
        index: i
      });
      this.saveDataToSessionStorage();
    } else {
      this.inputField.splice(0);
    }
  }

  onEmitSubtitle(event) {
    const item = {
      type: 'subtitle',
      content: event
    };
    const index = this.inputField[0].index;
    this.blog.elements[index] = item;
    this.blogElementAdded++;
    this.inputField = [];
    this.saveDataToSessionStorage();
  }

  onEmitTitleImage(event) {
    console.log(event);
    const item = {
      type: 'subtitle-image',
      content: `https://s3.us-east-2.amazonaws.com/pitchingtheory.com/${event.res}`,
      caption: event.caption
    };
    this.blog.type = '1';
    this.blog.imageUrl =  `https://s3.us-east-2.amazonaws.com/pitchingtheory.com/${event.res}`;
    this.blog.imageSubtitle = event.caption;
    this.noTitlePicture = false;
    this.showPicture = false;
    this.saveDataToSessionStorage();
  }

  onEmitRemoveTitleImage() {
    this.showPicture = false;
    this.saveDataToSessionStorage();
  }

  onEmitRemoveSubtitle(event, index) {
    this.inputField.pop();
    this.saveDataToSessionStorage();
  }

  onEmitParagraph(event) {
    const item = {
      type: 'paragraph',
      content: event
    };
    const index = this.inputField[0].index;
    this.blog.elements[index] = item;
    this.blogElementAdded++;
    this.inputField = [];
    this.saveDataToSessionStorage();
  }

  onEmitRemoveParagraph(event, index) {
    console.log(index);
    this.inputField.pop();
    this.saveDataToSessionStorage();
  }

  onEmitImage(event) {
    console.log(event);
    const item = {
      type: 'image',
      content: `https://s3.us-east-2.amazonaws.com/pitchingtheory.com/${event.res}`,
      caption: event.caption
    };
    const index = this.inputField[0].index;
    this.blog.elements[index] = item;
    this.blogElementAdded++;
    this.inputField = [];
    this.saveDataToSessionStorage();
  }

  onEmitRemoveImage(event, index) {
    console.log(index);
    this.inputField.pop();
    this.saveDataToSessionStorage();
  }

  onEmitVideo(event) {
    console.log(event);
    const item = {
      type: 'video',
      content: `https://s3.us-east-2.amazonaws.com/pitchingtheory.com/${event.res}`,
      caption: event.caption
    };
    const index = this.inputField[0].index;
    this.blog.elements[index] = item;
    this.blogElementAdded++;
    this.inputField = [];
    this.saveDataToSessionStorage();
  }

  onEmitRemoveVideo(event, index) {
    console.log(index);
    this.inputField.pop();
    this.saveDataToSessionStorage();
  }

  saveDataToSessionStorage() {
    const stringBlogInfo = JSON.stringify(this.blog);
    const stringInputFields = JSON.stringify(this.inputField);
    const editTitleMode = this.editTitleMode ? '1' : '0';
    window.sessionStorage.setItem('blog', stringBlogInfo);
    window.sessionStorage.setItem('inputFields', stringInputFields);
    window.sessionStorage.setItem('editTitleMode', editTitleMode);
    console.log('session storage set');
    console.log(stringBlogInfo);
    console.log(stringInputFields);
  }

  getDataFromSessionStorage() {
    return new Promise((resolve) => {
      const blog = window.sessionStorage.getItem('blog');
      const inputFields = window.sessionStorage.getItem('inputFields');
      const editTitleMode = window.sessionStorage.getItem('editTitleMode');
      if (blog) {
        this.blog = JSON.parse(blog);
      }
      if (inputFields) {
        this.inputField = JSON.parse(inputFields);
      }
      if (editTitleMode && editTitleMode === '0') {
        this.editTitleMode = false;
      }
      resolve(true);
    });
  }

  openEditTitle() {
    this.editTitleMode = true;
  }

  openEditItem(i) {
    if (i === 1000) {
     this.editTitlePicture = true;
     this.showPicture = true;
    } else {
      const item = this.blog.elements[i];
      this.inputField = [];
      this.addInputField(item.type, item.content, i);
    }
  }

  removeItem(i) {
    if (i === 1000) {
      this.blog.imageUrl = '';
      this.blog.imageSubtitle = '';
      this.blog.type = '2';
      this.noTitlePicture = true;
    } else {
      this.blog.elements.splice(i, 1);
      this.saveDataToSessionStorage();
    }
  }

  showAddTitle() {
    this.titleControlPristine = false;
    this.editTitleMode = true;
  }

  resetBlogPost() {
    this.blog = {
      type: '2',
      title: 'Blog Post Title',
      author: 'Cameron Hobson',
      date: '',
      imageUrl: '',
      imageSubtitle: '',
      elements: []
    };
    this.saveDataToSessionStorage();
  }

}
