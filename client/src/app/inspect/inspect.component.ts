import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/user.service';
import { User } from 'src/user.model';

@Component({
  selector: 'app-inspect',
  templateUrl: './inspect.component.html',
  styleUrls: ['./inspect.component.css']
})
export class InspectComponent implements OnInit {

  username: string = ""
  userData: User | null = null; 
  errorMessage: string | null = null;  


  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  receiveUsername(valueEmitted: string) {
    this.username = valueEmitted;
  }

  onSubmit() {
    // clear previous data and error message
    console.log('onSubmit called with username:', this.username);
    this.userData = null;
    this.errorMessage = null;

    // call service to get user data from GitHub 
    this.userService.inspectUser(this.username)
      .then(data => {
        if (!data.username) {
          this.errorMessage = "User not found";
          return;
        }
        this.userData = data;
      })
      
      .catch(err => {
        if (err.error && err.error.message) {
          this.errorMessage = `${this.username} was ${err.error.message}`;
        } else {
          this.errorMessage = "An error occurred while fetching user data.";
        }
          console.error(err);
      });
  }
} 
