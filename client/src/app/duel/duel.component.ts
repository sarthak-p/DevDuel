import { Component, OnInit } from '@angular/core';
import { User } from 'src/user.model';
import { UserService } from 'src/user.service';

@Component({
  selector: 'app-duel',
  templateUrl: './duel.component.html',
  styleUrls: ['./duel.component.css']
})
export class DuelComponent implements OnInit {
  usernameOne: string = ""
  usernameTwo: string = ""
  userOneData: User | null = null; 
  userTwoData: User | null = null; 
  errorMessage: string | null = null; 
  winner: string | null = null; 

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  receiveUsernameOne(valueEmitted: string) {
    this.usernameOne = valueEmitted;
    this.resetDuel();
  }

  receiveUsernameTwo(valueEmitted: string) {
    this.usernameTwo = valueEmitted;
    this.resetDuel();
  }

  resetDuel(): void {
    this.winner = null; 
    this.errorMessage = null; 
    this.userOneData = null;
    this.userTwoData = null;
  }

  onSubmit() {
  this.errorMessage = null;
  this.winner = null; 

  Promise.all([
    this.userService.inspectUser(this.usernameOne),
    this.userService.inspectUser(this.usernameTwo)
  ]).then(([userOneData, userTwoData]) => {
    if (!userOneData || !userTwoData) {
      this.errorMessage = "One or both users not found";
      return;
    }

    this.userOneData = userOneData;
    this.userTwoData = userTwoData;
    this.compareUsers();
  }).catch(err => {
     if (err.error && err.error.error && err.error.tips) {
          this.errorMessage = `${err.error.error} Refer to: ${err.error.tips}`;
        } else if (err.error && err.error.message) {
          this.errorMessage = `One or both users ${err.error.message}`;
        } else {
          this.errorMessage = "An error occurred while fetching user data";
        }
        console.error(err);
  });
}

   compareUsers() {
    if (!this.userOneData || !this.userTwoData) {
      this.errorMessage = "Could not fetch user data for comparison";
      return;
    }

    const userOneStars = this.userOneData['total-stars'] ?? 0;
    const userTwoStars = this.userTwoData['total-stars'] ?? 0;

    if (userOneStars > userTwoStars) {
      this.winner = this.usernameOne;
    } else if (userTwoStars > userOneStars) {
      this.winner = this.usernameTwo;
    } else {
      this.winner = 'Tie';
    }
  }
}
