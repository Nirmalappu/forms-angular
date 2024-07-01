import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];

  ngOnInit(): void {
    const usersFromStorage = localStorage.getItem('users');
    if (usersFromStorage) {
      this.users = JSON.parse(usersFromStorage) as User[];
    }
    this.filteredUsers = [...this.users];
  }

  deleteUser(index: number): void {
    const confirmation = window.confirm('Are you sure you want to delete this user?');
    if (confirmation) {
      this.users.splice(index, 1);
      localStorage.setItem('users', JSON.stringify(this.users));
      this.filteredUsers = [...this.users];
    }
  }

  filterUsers(filter: { gender: string, experienceRange: string }): void {
    this.filteredUsers = this.users.filter(user => {
      return (filter.gender === 'All' || user.gender === filter.gender) &&
             (filter.experienceRange === 'All' || this.isWithinExperienceRange(user.experience, filter.experienceRange));
    });
  }

  private isWithinExperienceRange(experience: number, range: string): boolean {
    switch(range) {
      case '0-1': return experience >= 0 && experience <= 1;
      case '1-3': return experience > 1 && experience <= 3;
      case '3+': return experience > 3;
      default: return true;
    }
  }
}
