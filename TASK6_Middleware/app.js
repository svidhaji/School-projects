const express = require('express');
require('dotenv').config();
const db = require('./utils/database');
const mediaTable = require('./utils/media_table');
const multer = require('multer');
const resize = require('./utils/resize');
const exif = require('./utils/exif');
const bodyParser = require('body-parser');

const app = express();

// tiedostojen tallennuskansio
const upload = multer({dest: 'public/uploads/'});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// parse application/json
app.use(bodyParser.json());

// tietokantayhteys
const connection = db.connect();

app.use(express.static('public'));

app.use('/modules', express.static('node_modules'));

app.get('/all', (req, res) => {
  mediaTable.select(connection, res);
  // res.send(200);
});

app.post('/image', upload.single('my-image'), (req, res, next) => {
  // req body comes now from multer
  next();
  /*
  const response = {
  message: 'File uploaded',
  file: req.file,
  };
  res.send(response);
  */
});

app.use('/image', (req, res, next) => {
  // tee pieni thumbnail
  resize.doResize(req.file.path, 300, './public/thumbs/' + req.file.filename).
      then(data => {
        next();
      });

});

app.use('/image', (req, res, next) => {
  // tee iso thumbnail
  resize.doResize(req.file.path, 640, './public/medium/' + req.file.filename).
      then(data => {
        next();
      });
});

// get coordinates
app.use('/image', (req, res, next) => {
  exif.getCoordinates(req.file.path).then(coords => {
    req.coordinates = coords;
    next();
  }).catch(() => {
    console.log('No coordinates');
    req.coordinates = {};
    next();
  });
});

app.use('/image', (req, res, next) => {
  // lisää kuvan tiedot tietokantaan
  const data = [
    req.body.category,
    req.body.title,
    req.body.details,
    'thumbs/' + req.file.filename,
    'medium/' + req.file.filename,
    'uploads/' + req.file.filename,
    req.coordinates,
    1, // dummy userID
  ];
  mediaTable.insert(data, connection, res);
});

// update image
app.patch('/update', (req, res) => {
  // req body comes now from body-parser
  console.log('body', req.body);
  // add dummy userID to req.body
  req.body.push(1);
  console.log('new body', req.body);
  // use req.body as data
  mediaTable.update(req.body, connection, res);
});

// delete image
app.delete('/del/:mID', (req, res) => {
  const data = [
    req.params.mID,
    1, // dummy userID
  ];
  mediaTable.del(data, connection, res);
});

app.listen(3000);