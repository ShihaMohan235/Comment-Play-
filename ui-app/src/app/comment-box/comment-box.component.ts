import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.css']
})
export class CommentBoxComponent implements OnInit {
  messageClass;
  message;
  newPost = false;
  loadingBlogs = false;
  form;
  processing = false;
  allComments = [];
  
  constructor(private formBuilder: FormBuilder, private commentService: CommentService) {
    this.createNewBlogForm(); // Create new blog form on start up
  }

  ngOnInit() {
 		this.fetchAllcomments();
  }

// Function to create new blog form
  createNewBlogForm() {
    this.form = this.formBuilder.group({
      body: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(500),
        Validators.minLength(5)
      ])]
    })
  }

    // Function to display new comment
  newCommentForm() {
    this.newPost = true; // Show new comment
  }
  
  fetchAllcomments() {
  	this.commentService.getAllcomments()
      .subscribe(
        (data) => {
          console.log(data.comments.length, "data");
          for(let i =0; i< data.comments.length; i++) {
            this.allComments.push(data.comments[i]);
          }
        });
  }
    // Function to submit a new comment
  onSubmit() {
     var userName = localStorage.getItem('userName');
    this.processing = true; // Disable submit button

    // Create comment object from form fields
    const comment = {
      body: this.form.get('body').value, // Body field
      createdBy: userName// CreatedBy field
    }
  //  Function to save comment into database
    this.commentService.newComment(comment)
      .subscribe(
        (data) => {
       // Check if comment was saved to database or not
      if (!data.success) {
       this.messageClass = 'alert alert-danger'; // Return error class
       this.message = data.message; // Return error message
        this.processing = false; // Enable submit button
      } else {
        this.messageClass = 'alert alert-success'; // Return success class
       this.message = data.message; // Return success message
        // Clear form data after two seconds
        setTimeout(() => {
          this.newPost = false; // Hide form
          this.processing = false; // Enable submit button
          this.message = false; // Erase error/success message
          this.form.reset(); // Reset all form fields
        }, 2000);
      }
   });
  }

likeClicked(user) {
	  	this.commentService.likeCommentbyuser(user)
      .subscribe(
        (data) => {
        	this.allComments = [];
        	this.fetchAllcomments();
        });
}
dislikeClicked(user) {
	  	this.commentService.dislikeCommentbyuser(user)
      .subscribe(
        (data) => {
        	this.allComments = [];
        	this.fetchAllcomments();
        });
}
  // Function to go back to previous page
 goBack() {
   window.location.reload(); // Clear all variable states
  }

}
