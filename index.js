// require('dotenv').config
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import home from './routes/routes.js';
// import session from 'express-session';
// import passport from 'passport';
// import paaportLocalMongoose from 'passport-local-mongoose'

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/home', home)

const CONNECTION_URL = 'mongodb://localhost:27017/Eclass';
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));
  // mongoose.set('useCreateIndex', true);
// mongoose.set('useFindAndModify', false);