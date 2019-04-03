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

  private userId: string;
  private email: string = "";
  private profileSub: Subscription;
  form: FormGroup;



  constructor(private route: ActivatedRoute, 
    private profileService: ProfileService) { }

  ngOnInit() 
  {
    this.isLoading = true;


    // this.route.queryParams
    //   .subscribe(params => {
    //     console.log(params);

    //     this.userId = params.userId;
    //     console.log(this.userId);
    //   })


    this.email = localStorage.getItem("email");
    console.log(this.email);
   // this.userId = localStorage.getItem("email");

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
     // this.imagePreview = this.dish.imagePath;
    });

  }

  ngOnDestroy()
  {
    this.profileSub.unsubscribe();
  }

    // this.route.data.subscribe(
    //   (data: {profile: Profile}) => {
    //     this.profile = data.profile;
    //   }
    // );

  // Load the current user's data
  // this.AuthService.currentUser.subscribe(
  //   (userData: User) => {
  //     this.currentUser = userData;
  //     this.isUser = (this.currentUser.name === this.profile.username);
  //   }
  // );
}
