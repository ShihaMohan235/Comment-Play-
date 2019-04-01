const Comment = require('../models/comment'); // Import Blog Model Schema
const config = require('../config/database'); // Import database configuration

module.exports = (router) => {


// CREATE NEW COMMENT 

  router.post('/newComment', (req, res) => {
      // Check if comment body was provided
      if (!req.body.body) {
        res.json({ success: false, message: 'comment body is required.' }); // Return error message
      } else {
        // Check if comment's creator was provided
        if (!req.body.createdBy) {
          res.json({ success: false, message: 'comment creator is required.' }); // Return error
        } else {
          // Create the comment object for insertion into database
          const comment = new Comment({
            body: req.body.body, // Body field
            createdBy: req.body.createdBy, // CreatedBy field
            createdAt: Date.now()
          });
          // Save comment into database
          comment.save((err) => {
            // Check if error
            if (err) {
              // Check if error is a validation error
              if (err.errors) {
                  // Check if validation error is in the body field
                  if (err.errors.body) {
                    res.json({ success: false, message: err.errors.body.message }); // Return error message
                  } else {
                    res.json({ success: false, message: err }); // Return general error message
                  }
              } else {
                res.json({ success: false, message: err }); // Return general error message
              }
            } else {
              res.json({ success: true, message: 'comment saved!' }); // Return success message
            }
          });
        }
      }
  });


// GET ALL COMMENTS

  router.get('/allComments', (req, res) => {
    // Search database for all comment posts
    Comment.find({}, (err, comments) => {
      // Check if error was found or not
      if (err) {
        res.json({ success: false, message: err }); // Return error message
      } else {
        // Check if comment were found in database
        if (!comments) {
          res.json({ success: false, message: 'No comments found.' }); // Return error of no comments found
        } else {
          res.json({ success: true, comments: comments }); // Return success and comments array
        }
      }
    }).sort({ '_id': -1 }); // Sort comments from newest to oldest
  });


// LIKE COMMENT 

router.put('/likeComment', (req, res) => {
    // Check if id was passed provided in request body
    if (!req.body.user) {
      res.json({ success: false, message: 'No id was provided.' }); // Return error message
    } else {
      // Search the database with id
      Comment.findOne({ createdBy: req.body.user, createdAt: req.body.date }, (err, comment) => {
        // Check if error was encountered
        if (err) {
          res.json({ success: false, message: 'Invalid Comment id' }); // Return error message
        } else {
          // Check if id matched the id of a comment post in the database
          if (!comment) {
            res.json({ success: false, message: 'That comment was not found.' }); // Return error message
          } else {
    
                        comment.likes++; // Incriment likes
                        // Save comment post
                        comment.save((err) => {
                          if (err) {
                            res.json({ success: false, message: 'Something went wrong.' }); // Return error message
                          } else {
                            res.json({ success: true, message: 'comment liked!' }); // Return success message
                          }
                        });
                      }
            }
          });
        }
      });


 //    DISLIKE COMMENT
  router.put('/dislikeComment', (req, res) => {
    // Check if id was provided inside the request body
    if (!req.body.user) {
      res.json({ success: false, message: 'No id was provided.' }); // Return error message
    } else {
      // Search database for comment post using the id
      Comment.findOne({ createdBy: req.body.user , createdAt: req.body.date}, (err, comment) => {
        // Check if error was found
        if (err) {
          res.json({ success: false, message: 'Invalid comment id' }); // Return error message
        } else {
          // Check if comment post with the id was found in the database
          if (!comment) {
            res.json({ success: false, message: 'That comment was not found.' }); // Return error message
          } else {
                        comment.dislikes++; // Increase likes by one
                        // Save comment data
                        comment.save((err) => {
                          // Check if error was found
                          if (err) {
                            res.json({ success: false, message: 'Something went wrong.' }); // Return error message
                          } else {
                            res.json({ success: true, message: 'comment disliked!' }); // Return success message
                          }
                        });
          
          }
        }
      });
    }
  });
  return router;
};