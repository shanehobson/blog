import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) { 
  }

  addtoMailingListUrl = 'api/addToMailingList';

  addtoMailingList(name, email) { 
    const post = { name, email };
    const url = this.addtoMailingListUrl;
    // const options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };   
    // options['headers'].append('Response-Type', 'text');     
    return new Promise((resolve, reject) => {
        this.http.post(url, post)
            .subscribe(data => {
                resolve(data);
                reject('add to mailing list failed');
            });
    });
}
}
