import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from "../auth/auth.service";
import { Subscription } from 'rxjs';
import { User } from '../models/interface-models';
import { ProfileService } from '../profile/profile.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy
{
    isLoading = false;;
    profile: User;
    email: string;
    profileSub: Subscription;
    userIsAuthenticated = false;
    private authListenerSubs: Subscription;
    constructor(private authService: AuthService, public profileService: ProfileService) {}

    ngOnInit()
    {
        this.isLoading = true;
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authListenerSubs = this.authService.getAuthStatusListener()
            .subscribe(isAuthenticated => {
                this.userIsAuthenticated = isAuthenticated;
            });
        
            this.email = localStorage.getItem("email");
            console.log("email" + this.email);
        
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

    onLogout()
    {
        this.authService.logout();
    }

    ngOnDestroy()
    {
        this.authListenerSubs.unsubscribe();
    }
}
