import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import User from 'src/app/models/User';
import userInfosRequest from 'src/app/models/UserInfosRequest';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  user!: User;

  constructor(private authService: AuthService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.getUserInfos();
  }

  formInit(): void {
    this.profileForm = this.fb.group({
      username: [this.user.username, [Validators.required]],
      email: [this.user.email, [Validators.email, Validators.required]],
    });
  }

  disconnect() {
    this.authService.logout();
  }

  getUserInfos() {
    this.authService.getUserInfos().subscribe({
      next: (user: User) => {
        this.user = user;
        this.formInit();
      },
      error: (error) => {
        console.error('Error while fetching user infos: ', error);
      }
    });
  }

  updateUserInfos() {
    if (this.profileForm.valid) {
      const formData: userInfosRequest = this.profileForm.value;

      this.authService.updateUserInfos(formData).subscribe({
        next: (user: User) => {
          this.user = user;
        },
        error: (error) => {
          console.error('Error while updating user infos: ', error);
        }
      });
    }
  }

}
