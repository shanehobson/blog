import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { FormService} from '../services/form.service'

@Component({
  selector: 'app-aside-mailing-list',
  templateUrl: './aside-mailing-list.component.html',
  styleUrls: ['./aside-mailing-list.component.scss']
})
export class AsideMailingListComponent implements OnInit {

  formLoading = false;
  formSubmission = false;
  
  mailingListForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private formService: FormService
  ) { 
    this.mailingListForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  submitMailingList(form) {
    const name = form.controls['name'].value;
    const email = form.controls['email'].value;
    console.log(name, email);
    this.formLoading = true;
    this.formService.addtoMailingList(name, email)
    .then((res) => {
      console.log(res);
      setTimeout(() => {
        this.formLoading = false;
        this.formSubmission = true;
      }, 400);
    });
  }

}
