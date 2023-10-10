// import { Component, Input, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import {
//   faUserAstronaut
// } from '@fortawesome/free-solid-svg-icons';
// import { ProfileOption } from 'src/app/models/profileOptions';
// import { AuthService } from 'src/app/services/authentication.service';
// import { ProfileOptionsService } from 'src/app/services/profile-options.service';

// @Component({
//   selector: 'app-profile-options',
//   templateUrl: './profile-options.component.html',
//   styleUrls: ['./profile-options.component.css']
// })
// export class ProfileOptionsComponent implements OnInit {
//   faUser = faUserAstronaut;
//   isLoggedIn: boolean = false;
//   isProfileOpen: boolean = false;
//   profileOptions: ProfileOption[] = [];

//   constructor(private router: Router,
//     private authService: AuthService,
//     private profileOptionsService: ProfileOptionsService) { }

//   ngOnInit() {
//     // Check login status initially
//     this.isLoggedIn = this.authService.isLoggedIn();

//     // Subscribe to changes in login status
//     this.authService.isLoggedIn$().subscribe((loggedIn) => {
//       this.isLoggedIn = loggedIn;

//       // If logged in, fetch profile options
//       if (loggedIn) {
//         this.profileOptionsService.getProfileOptions().subscribe((profileOptions) => {
//           this.profileOptions = profileOptions;
//         });
//       }
//     });
//   }

//   showProfileOptions() {
//     this.isProfileOpen = true;
//   }

//   hideProfileOptions() {
//     this.isProfileOpen = false;
//   }

//   navigateToLogin() {
//     // Navigate to the Login component
//     this.router.navigate(['/login']);
//   }

//   logOut() {
//     this.authService.logout();
//     this.isLoggedIn = false;
//   }
// }


import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faUserAstronaut
} from '@fortawesome/free-solid-svg-icons';
import { ProfileOption } from 'src/app/models/profileOptions';
import { AuthService } from 'src/app/services/authentication.service';
import { ProfileOptionsService } from 'src/app/services/profile-options.service';

@Component({
  selector: 'app-profile-options',
  templateUrl: './profile-options.component.html',
  styleUrls: ['./profile-options.component.css']
})
export class ProfileOptionsComponent implements OnInit {
  faUser = faUserAstronaut;
  isProfileOpen: boolean = false;
  profileOptions: ProfileOption[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private profileOptionsService: ProfileOptionsService
  ) { }

  ngOnInit() {
    // Check login status initially
    if (this.authService.userLoggedIn) {
      this.profileOptionsService.getProfileOptions().subscribe((profileOptions) => {
        this.profileOptions = profileOptions;
      });
    }
    // Subscribe to changes in login status
    // this.authService.isLoggedIn().subscribe((loggedIn) => {
    //   this.isLoggedIn = loggedIn;

    //   // If logged in, fetch profile options
    //   if (loggedIn) {
    //     this.profileOptionsService.getProfileOptions().subscribe((profileOptions) => {
    //       this.profileOptions = profileOptions;
    //     });
    //   }
    // });
  }

  showProfileOptions() {
    this.isProfileOpen = true;
  }

  hideProfileOptions() {
    this.isProfileOpen = false;
  }

  navigateToLogin() {
    // Navigate to the Login component
    this.router.navigate(['/login']);
  }

  logOut() {
    this.authService.logout();
  }
}
