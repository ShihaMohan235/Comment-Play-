const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise; // Configure Mongoose Promises
const Schema = mongoose.Schema; // Import Schema from Mongoose


// Validate Function to check body length
let bodyLengthChecker = (body) => {
  // Check if body exists
  if (!body) {
    return false; // Return error
  } else {
    // Check length of body
    if (body.length < 5 || body.length > 500) {
      return false; // Return error if does not meet length requirement
    } else {
      return true; // Return as valid body
    }
  }
};

// Array of Body validators
const bodyValidators = [
  // First Body validator
  {
    validator: bodyLengthChecker,
    message: 'Body must be more than 5 characters but no more than 500.'
  }
];

// Validate Function to check comment length
let commentLengthChecker = (comment) => {
  // Check if comment exists
  if (!comment[0]) {
    return false; // Return error
  } else {
    // Check comment length
    if (comment[0].length < 1 || comment[0].length > 200) {
      return false; // Return error if comment length requirement is not met
    } else {
      return true; // Return comment as valid
    }
  }
};

// Array of Comment validators
const commentValidators = [
  // First comment validator
  {
    validator: commentLengthChecker,
    message: 'Comments may not exceed 200 characters.'
  }
];

// Comment Model Definition
const commentSchema = new Schema({
  body: { type: String,
          required: true, 
          validate: bodyValidators 
        },
  createdBy: { type: String },
  createdAt: { type: Date, 
               default: Date.now() 
             },
  likes: { type: Number, 
           default: 0 },
  dislikes: { type: Number, 
              default: 0 
            }
});

// Export Module/Schema
module.exports = mongoose.model('Comment', commentSchema);