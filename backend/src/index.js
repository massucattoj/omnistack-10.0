const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

const routes = require('./routes');
const { setupWebSocket } = require('./websocket');

const app = express();
const server = http.Server(app);

setupWebSocket(server);

mongoose.connect('mongodb+srv://massucattoj:omnistack10@omnistack10-ebf71.mongodb.net/week10?retryWrites=true&w=majority', {
  useUnifiedTopology: true,
  useNewUrlParser: true
})

app.use(cors())
app.use(express.json());
app.use(routes);

server.listen(3333)