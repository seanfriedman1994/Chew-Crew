import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AuthData } from '../models/interface-models';
import { User } from '../models/interface-models';
import { AuthService } from '../auth/auth.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ProfileService } from './profile.service';
import { ParamMap } from '@angular/router';
import { Crew } from '../models/interface-models';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

@Injectable()
export class ProfileComponent implements OnInit, OnDestroy {
  isLoading = false;

  profile: User;
  isUser: boolean;
  crewMembers: Crew[] = [];
  userCrews: Crew[] = [];
  private userId: string;
  private email: string = "";
  private profileSub: Subscription;
  form: FormGroup;
  userIsAuthenticated = false;
  private authStatusSub: Subscription;

  constructor(private route: ActivatedRoute, 
    private profileService: ProfileService, private authService: AuthService) { }

  ngOnInit() 
  {
    this.isLoading = true;

    this.userId = this.authService.getUserId();
    this.userIsAuthenticated = this.authService.getIsAuth();
    console.log(this.userIsAuthenticated);
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        console.log(isAuthenticated);
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });


    this.email = localStorage.getItem("email");
    console.log(this.email);

    this.profileSub = this.profileService.fetchProfile(this.email).subscribe(profileData => {
      console.log(profileData);
      this.isLoading = false;
      this.profile = 
      {
        id: profileData._id,
        email: profileData.email,
        name: profileData.name, 
        bio: profileData.bio,
        image: profileData.image,
      };
    });

  }

  ngOnDestroy()
  {
    this.profileSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
