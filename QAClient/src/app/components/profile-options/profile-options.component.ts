import { Component, OnInit } from '@angular/core';
import {
  faUserAstronaut
} from '@fortawesome/free-solid-svg-icons';
import { ProfileOption } from 'src/app/models/profileOptions';

@Component({
  selector: 'app-profile-options',
  templateUrl: './profile-options.component.html',
  styleUrls: ['./profile-options.component.css']
})
export class ProfileOptionsComponent implements OnInit {
  faUser = faUserAstronaut;
  profileOptions: ProfileOption[] = [
    {
      optionId: 1,
      option: 'Profile'
    },
    {
      optionId: 2,
      option: 'Profile'
    },
    {
      optionId: 3,
      option: 'Profile'
    },
  ];

  isProfileOpen: boolean = false;

  ngOnInit() {

  }

  showProfileOptions() {
    this.isProfileOpen = true;
  }

  hideProfileOptions() {
    this.isProfileOpen = false;
  }
}


