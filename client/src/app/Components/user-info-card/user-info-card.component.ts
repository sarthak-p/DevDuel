import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/user.model'; 
@Component({
  selector: 'app-user-info-card',
  templateUrl: './user-info-card.component.html',
  styleUrls: ['./user-info-card.component.css']
})
export class UserInfoCardComponent implements OnInit {
   @Input() user: User | null = null; 

  constructor() { }

  ngOnInit(): void {
  }

  getUserInfoKeys(): string[] {
  if (this.user) {
    return Object.keys(this.user).filter(
      key => key !== 'avatar_url' && key !== 'bio'
    );
  }
  return [];
}

  
getDetailLabels(): { key: string; label: string }[] {
  return [
    { key: 'username', label: 'username' },
    { key: 'name', label: 'name' },
    { key: 'location', label: 'location' },
    { key: 'titles', label: 'titles' },
    { key: 'favorite-language', label: 'fav language' },
    { key: 'total-stars', label: 'total stars' },
    { key: 'highest-starred', label: 'highest star count' },
    { key: 'public-repos', label: 'public repos' },
    { key: 'perfect-repos', label: 'perfect repos' },
    { key: 'followers', label: 'followers' },
    { key: 'following', label: 'following' }
  ];
}

  formatLabel(key: string): string {
    if (key.includes('-')) {
      return key.split('-').map(this.capitalize).join(' ');
    }
    return this.capitalize(key);
  }

  private capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
