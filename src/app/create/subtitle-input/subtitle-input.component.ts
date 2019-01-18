import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-subtitle-input',
  templateUrl: './subtitle-input.component.html',
  styleUrls: ['./subtitle-input.component.scss']
})
export class SubtitleInputComponent implements OnInit {
  @Output() emitSubtitle = new EventEmitter();
  @Output() emitRemoveSubtitle = new EventEmitter();
  @Input() itemIndex;
  @Input() content;

  subtitleForm: FormGroup;
  inputSubmitted = false;

  constructor(
    private fb: FormBuilder
  ) {
    this.subtitleForm = this.fb.group({
      subtitle: ['', Validators.required]
    });
 }

  ngOnInit() {
    const inputSubmitted = window.sessionStorage.getItem('inputSubmitted' + this.itemIndex);
    if (inputSubmitted === '1') {
      this.inputSubmitted = true;
    }
    this.subtitleForm.controls['subtitle'].setValue(this.content);
  }

  addSubtitle(form) {
    const subtitle = form.controls['subtitle'].value;
    this.inputSubmitted = true;
    window.sessionStorage.setItem('inputSubmitted' + this.itemIndex, this.inputSubmitted ? '1': '0');
    this.emitSubtitle.emit(subtitle);
    form.markAsPristine();
  }

  removeSubtitle(form) {
    this.emitRemoveSubtitle.emit(this.inputSubmitted);
  }

  isTouchedInvalid(formName: string, controlName: string) {
    const controlTouched = this[formName].controls[controlName].touched;
    const controlValid = this[formName].controls[controlName].valid;
    return controlTouched && !controlValid;
  }
}
