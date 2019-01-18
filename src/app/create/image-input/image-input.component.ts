import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BlogService } from '../../services/blogService';

@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.component.html',
  styleUrls: ['./image-input.component.scss']
})
export class ImageInputComponent implements OnInit {
  @Output() emitImage = new EventEmitter();
  @Output() emitRemoveImage = new EventEmitter();
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

  addImage() {
    this.isLoading = true;
    console.log(this.file);
    let extension;
    if (this.file.type === 'image/jpeg') {
      extension === '.jpg';
    } else if (this.file.type === 'image/png') {
      extension === '.png';
    }
    const name = `${this.file.name}${Date.now()}`;
    const uploadData = new FormData();
    uploadData.append('file', this.file, `${name}.${extension}`);
    console.log(uploadData);
    this.blogService.saveImage(uploadData).then((res) => {
      console.log(res);
      this.emitImage.emit({ res, caption: this.caption });
      this.inputSubmitted = true;
      this.isLoading = false;
    });
  }

  addCaption(form) {
    this.caption = form.controls['caption'].value;
  }

  removeImage(form) {
    this.emitRemoveImage.emit(this.inputSubmitted);
  }

  getImageId() {
    let now = Date.now();
    return 'image' + this.itemIndex + now;
  }
}
