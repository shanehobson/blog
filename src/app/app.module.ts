import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import {ColorService} from './services/colorService';
import {BlogService} from './services/blogService';
import {FormService} from './services/form.service';
import { RouterModule, Routes } from '@angular/router';
import { Template1Component } from './blog-templates/template1/template1.component';
import { AsideComponent } from './aside/aside.component';
import { Template2Component } from './blog-templates/template2/template2.component';
import { CreateComponent } from './create/create.component';
import { SubtitleInputComponent } from './create/subtitle-input/subtitle-input.component';
import { ParagraphInputComponent } from './create/paragraph-input/paragraph-input.component';
import { ImageInputComponent } from './create/image-input/image-input.component';
import { VideoInputComponent } from './create/video-input/video-input.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { DateInputComponent } from './create/date-input/date-input.component';
import { AuthorInputComponent } from './create/author-input/author-input.component';
import { AsideAboutComponent } from './aside-about/aside-about.component';
import { AsideMailingListComponent } from './aside-mailing-list/aside-mailing-list.component';

const appRoutes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'create', component: CreateComponent },
  { path: 'edit', component: HomeComponent },
  { path: '', component: HomeComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    Template1Component,
    AsideComponent,
    Template2Component,
    CreateComponent,
    SubtitleInputComponent,
    ParagraphInputComponent,
    ImageInputComponent,
    VideoInputComponent,
    SpinnerComponent,
    DateInputComponent,
    AuthorInputComponent,
    AsideAboutComponent,
    AsideMailingListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    [BrowserAnimationsModule],
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [  ColorService, BlogService, FormService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
