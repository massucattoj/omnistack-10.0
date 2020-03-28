const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://massucattoj:omnistack10@omnistack10-ebf71.mongodb.net/week10?retryWrites=true&w=majority', {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

app.use(cors())
app.use(express.json());
app.use(routes);

app.listen(3333)