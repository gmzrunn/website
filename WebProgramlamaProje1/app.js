// Gerekli modüllerin içe aktarılması
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');

const cookieParser = require('cookie-parser');

// Auth rotasının içe aktarılması
const authRoute = require('./routes/authRoute');

// Express uygulamasının oluşturulması
const app = express();
// .env dosyasının içeriğini kullanabilmek için dotenv modülünün içe aktarılması
require('dotenv').config();

// .env dosyasındaki MONGO_URL değerini alıyoruz
const mongoURL = process.env.DB_URL;

mongoose.connect(mongoURL)
  .then(() => {
    console.log('DB Connected Successfully');

    //Middlewares
    app.use(cors());
    app.use(express.static('public'));
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    app.use(cookieParser());

    //ROUTES
    app.use('/users', authRoute);


    const port = 3000;
    app.listen(port, () => {
      console.log(`App startted on port ${port}`);
    });
  })
