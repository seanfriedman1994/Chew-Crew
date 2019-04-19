import { Component, OnInit, OnDestroy, ChangeDetectorRef, Input, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from "../auth/auth.service";
import { Subscription, Subject } from 'rxjs';
import { User } from '../models/interface-models';
import { ProfileService } from '../profile/profile.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy
{
    profile: User = null;
    isLoading = false;
    email: string;
    profileSub: Subscription;
    userIsAuthenticated = false;
    private authListenerSubs: Subscription;
    private isLoggedIn: Subject<boolean>;


    constructor(private authService: AuthService, public profileService: ProfileService, private changeRef: ChangeDetectorRef) {}

    ngOnInit()
    {
        this.isLoading = true;
        this.userIsAuthenticated = this.authService.getIsAuth();
        this.authListenerSubs = this.authService.getAuthStatusListener()
            .subscribe(isAuthenticated => {
                this.userIsAuthenticated = isAuthenticated;
                if (this.userIsAuthenticated) {
                    this.profile = this.profileService.profile;
                }
                this.changeRef.markForCheck();
            });
        
            this.email = localStorage.getItem("email");
            console.log("email" + this.email);
        
        // this.profileSub = this.profileService.fetchProfile(this.email).subscribe(profileData => {
        //     console.log(profileData);
        //     this.isLoading = false;
        //     this.profile = 
        //     {
        //         id: profileData._id,
        //         email: profileData.email,
        //         name: profileData.name, 
        //         bio: profileData.bio,
        //         image: profileData.image,
        //     };
            
            
        // });
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
