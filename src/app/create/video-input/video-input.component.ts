import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BlogService } from '../../services/blogService';

@Component({
  selector: 'app-video-input',
  templateUrl: './video-input.component.html',
  styleUrls: ['./video-input.component.scss']
})

export class VideoInputComponent implements OnInit {
  @Output() emitVideo = new EventEmitter();
  @Output() emitRemoveVideo = new EventEmitter();
  @Input() itemIndex;
  @Input() content;
  isLoading = false;
  file;
  fileString;
  caption = '';
  captionForm: FormGroup;
  inputSubmitted = false;

  constructor(
    private blogService: BlogService,
    private fb: FormBuilder
  ) {
    this.captionForm = this.fb.group({
      caption: ['', Validators.required]
    });
  } 
 
  ngOnInit() {
    const inputSubmitted = window.sessionStorage.getItem('inputSubmitted' + this.itemIndex);
    if (inputSubmitted === '1') {
      this.inputSubmitted = true;
    }
  }

  onFileChanged(event) {
    this.file = event.target.files[0];
  }

  addVideo() {
    this.isLoading = true;
    console.log(this.file);
    let extension;
    if (this.file.type === 'video/quicktime') {
      extension === '.mov';
    } else {
      console.log('incorrect file type');
      extension === '.mov'; // change before prod
    }
    const name = `${this.file.name}${Date.now()}`;
    const uploadData = new FormData();
    uploadData.append('file', this.file, `${name}.${extension}`);
    console.log(uploadData);
    this.blogService.saveVideo(uploadData).then((res) => {
      console.log(res);
      this.emitVideo.emit({ res, caption: this.caption });
      this.inputSubmitted = true;
      this.isLoading = false;
    });
  }

  addCaption(form) {
    this.caption = form.controls['caption'].value;
  }

  removeVideo(form) {
    this.emitRemoveVideo.emit(this.inputSubmitted);
  }

  getVideoId() {
    let now = Date.now();
    return 'Video' + this.itemIndex + now;
  }
}
