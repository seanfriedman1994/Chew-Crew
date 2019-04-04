import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { ProfileService } from 'src/app/profile/profile.service';

@Component({
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit, OnDestroy {
    isLoading = false;
    private authStatusSub: Subscription;

    constructor(public authService: AuthService, public profileService: ProfileService) {}

    ngOnInit()
    {
        this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
            authStatus => {
                this.isLoading = false;
            }
        );
    }

    onSignUp(form: NgForm)
    {
        if(form.invalid)
        {
            return;
        }
        this.isLoading = true;
        this.authService.createUser(form.value.email, form.value.password);
        this.profileService.createProfile(form.value.email);
    }

    ngOnDestroy()
    {
        this.authStatusSub.unsubscribe();
    }

}
