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
    this.userData = null;
    this.errorMessage = null;

    this.userService.inspectUser(this.username)
      .then(data => {
        if (!data.username) {
          this.errorMessage = "User not found.";
          return;
        }
        this.userData = data;
      })
      .catch(err => {
        if (err.error && err.error.error && err.error.tips) {
          this.errorMessage = `${err.error.error} Refer to: ${err.error.tips}`;
        } else if (err.error && err.error.message) {
          this.errorMessage = `${this.username} was ${err.error.message}`;
        } else {
          this.errorMessage = "An error occurred while fetching user data";
        }
        console.error(err);
      });
  }
} 
