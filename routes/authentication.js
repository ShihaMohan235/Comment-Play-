const User = require('../models/user'); // Import User Model Schema
//const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const config = require('../config/database'); // Import database configuration
module.exports = (router) => {

  /* ========
  LOGIN ROUTE
  ======== */
  router.post('/login', (req, res) => {
    // Check if username was provided
    if (!req.body.user) {
      res.json({ success: false, message: 'No username was provided' }); // Return error
    } else if(!req.body.email) {
      res.json({ success: false, message: 'No email was provided' }); // Return error
    }else if(!req.body.userId) {
      res.json({ success: false, message: 'No userId was provided' }); // Return error
    } else{
            res.json({
                  success: true,
                  message: 'Success!',
                  user: {
                    user: req.body.user,
                    email: req.body.email,
                    userId: req.body.userId,
                    token: req.body.token
                  }
                }); // Return success and token to frontend
      }
    });

  return router; // Return router object to main index.js
}