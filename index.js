const express = require('express');
var app = express();
var cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');
const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
// const dbConnection = require('./db/db-connection')
const jwtAuth = require('./lib/auth/jwt');
const path = require('path')
// const db = dbConnection();
// const user = require('./models/user');
// const todo = require('./models/todo');
// const comments = require('./models/comments');
// const card = require('./models/card');
// const bucket = require('./models/bucket');
// const db = require('./models/index')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(express.json());

app.set('db', require('./models'));
var db = app.get('db');

var endpoints = express.Router();

// console.log(db.bucket)
app.use('/', endpoints);
require('./lib/routes/user')(endpoints, db, jwt, jwtAuth)


app.use('/', endpoints)
require('./lib/routes/project')(endpoints, db, jwtAuth)


app.use('/', endpoints)
require('./lib/routes/todo')(endpoints, db, jwtAuth)


app.use('/', endpoints)
require('./lib/routes/markasdone')(endpoints, db, jwtAuth)


app.use('/', endpoints)
require('./lib/routes/deletetodo')(endpoints, db, jwtAuth)


app.use('/', endpoints)
require('./lib/routes/description')(endpoints, db, jwtAuth)


app.use('/', endpoints)
require('./lib/routes/comment')(endpoints, db, jwtAuth)


app.use('/', endpoints)
require('./lib/routes/bucket')(endpoints, db, jwtAuth)


app.use('/', endpoints)
require('./lib/routes/profile')(endpoints, db, jwtAuth)


var uploadFile = express.Router();
app.use('/', uploadFile);
require('./lib/routes/uploadFile')(uploadFile, db, multer, multerS3, aws, path, jwt);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

app.listen(2000, () => {
    console.log('Your app is listening port 2000')
})
