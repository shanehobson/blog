# Blog

A copy of the [Pitching Theory blog and content management system](https://github.com/shanehobson/pitching-theory-app), configured to use its own MongoDB database. It is an Angular 7 and Express app where a signed-in author composes multimedia posts (text, images, and video), publishes them, and edits or deletes them later. Media is stored on AWS S3.

The source is the same as `pitching-theory-app`. The only code change is the database name in the MongoDB connection string, and the dependency lockfile also differs. See [pitching-theory-app](https://github.com/shanehobson/pitching-theory-app) for the full feature list and architecture.

> Originally built in 2019 and copied here in 2020. This project is not actively maintained.

## Features

- A public blog feed, newest first, with keyword search across post content
- Admin login with Passport and JWT, and route guards on authoring pages
- A post editor with subtitle, paragraph, image, and video blocks and a live preview
- Image and video uploads to S3
- Editing and deleting published posts
- Mailing-list signup that sends email through Nodemailer

## Tech stack

Angular 7, TypeScript, Angular Material, Node.js, Express, Mongoose/MongoDB Atlas, Passport, AWS S3, Nodemailer.

## Getting started

```bash
npm install
npm run build   # compile the Angular app into dist/
npm start       # node server.js, defaults to port 3000
```

Environment variables: `PORT`, `MongoDbPassword`, `HASH_SECRET`, `AWS_ACCESS_KEY_ID`, `AWSSecretKey`, `S3_BUCKET`, `EMAILER_PASSWORD`.

The Atlas cluster host is hard-coded in `server/routes/api.js`, and the S3 URL prefix for media is hard-coded in `src/app/create/create.component.ts`.
