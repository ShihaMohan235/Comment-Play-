const express = require('express');
const app = express();
const router = express.Router(); // Creates a new router object.
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise;
const config = require('./config/database'); // Mongoose Config
const path = require('path'); // NodeJS Package for file paths
const comments = require('./routes/comments')(router); // Import Blog Routes
const bodyParser = require('body-parser'); // Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const cors = require('cors'); // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options
const authentication = require('./routes/authentication')(router); // Import Authentication Routes

mongoose.connect(config.uri, (err) => {
  if (err) {
    console.log('Could NOT connect to database: ', err);
  } else {
    console.log('Connected to database: ' + config.db);
  }
});
//Middleware
  // Parse application/json
app.use(cors({ 'Access-Control-Allow-Origin': 'http://localhost:8080' }));
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(express.static(__dirname + '/ui-app/dist/')); // Provide static directory for frontend
app.use('/authentication', authentication); // Use Authentication routes in application
app.use('/comments', comments); // Use Blog routes in application
//Connect server to Angular 2 Index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/ui-app/dist/index.html'));
});

 // Assume 404 since no middleware responded
  app.use(function (req, res) {
    res.status(404).send();
  });

// Start Server: Listen on port 8080
app.listen(8080, () => {
  console.log('Listening on port 8080');
});