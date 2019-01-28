import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  isLoading = false;

  //Login
  loginForm: FormGroup;
  userLoggedIn = false; // CHANGE BACK TO FALSE BEFORE PROD
  failedAttempt = false;
  username = '';
  password = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
   }

  ngOnInit() {
    this.username = window.sessionStorage.getItem('username');
    this.loginForm.controls['username'].setValue(this.username);
    this.password = window.sessionStorage.getItem('password');
    this.loginForm.controls['password'].setValue(this.password);
  }


  handleLoginSubmit(form) {
    this.isLoading = true;
    this.username = form.controls['username'].value;
    this.password = form.controls['password'].value;
    this.authService.login({username: this.username, password: this.password})
    .subscribe(() => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
    });
  }

  register() {
    this.authService.register(({ username: this.username, password: this.password })).subscribe(() => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
    });
  }
}


