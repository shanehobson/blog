import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable()
    export class BlogService {
        constructor(private http: HttpClient) { }

    getPostsUrl = '/api/posts';
    getBlogPostUrl = '/api/getPost?id=';
    saveImageUrl = 'api/images';
    addBlogPostUrl = 'api/addPost';
    removeBlogPostUrl = 'api/removePost?id=';
    removeAllPostsUrl = '/api/removeAllPosts';

    getBlogs() {
        const url = this.getPostsUrl;
        return new Promise((resolve, reject) => {
            this.http.get(url)
                .subscribe(data => {
                    resolve(data);
                    reject('get blog posts from server request failed');
                });
        });
    }

    getBlogPost(id) {
        const url = this.getBlogPostUrl + id;
        console.log('entered getBlogPost HTTP service', id);
        return new Promise((resolve, reject) => {
            this.http.get(url)
                .subscribe(data => {
                    resolve(data);
                    reject('get blog post from server request failed');
                });
        });
    }

    saveImage(image) {
        const url = this.saveImageUrl;
        return new Promise((resolve, reject) => {
            this.http.post(url, image, {responseType: 'text'})
                .subscribe(data => {
                    resolve(data);
                    reject('save image to server failed');
                });
        });
    }

    saveVideo(video) {
        const url = this.saveImageUrl;
        return new Promise((resolve, reject) => {
            this.http.post(url, video, {responseType: 'text'})
                .subscribe(data => {
                    resolve(data);
                    reject('save video to server failed');
                });
        });
    }

    addBlogPost(blogPost) {
        console.log(blogPost);
        const stringifiedPost = JSON.stringify(blogPost);
        console.log(stringifiedPost);
        const url = this.addBlogPostUrl;
        const options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };   
        options['headers'].append('Response-Type', 'text');     
        return new Promise((resolve, reject) => {
            this.http.post(url, stringifiedPost, options)
                .subscribe(data => {
                    resolve(data);
                    reject('save blog post failed');
                });
        });
    }

    removeBlogPost(id) {
        const url = this.removeBlogPostUrl + id;
        return new Promise((resolve, reject) => {
            this.http.get(url, {responseType: 'text'})
                .subscribe(data => {
                    resolve(data);
                    reject('remove blog post failed');
                });
        });
    }

    // Remove ALL Posts...for development use only!!
    removeAllPosts() {
        const url = this.removeAllPostsUrl;
        return new Promise((resolve, reject) => {
            this.http.get(url, {responseType: 'text'})
                .subscribe(data => {
                    resolve(data);
                    reject('remove all posts failed');
                });
        });
    }
}