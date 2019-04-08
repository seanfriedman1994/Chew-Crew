import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from "../../environments/environment";

import { AuthService } from '../auth/auth.service';
import { User, EventActivity, Crew} from '../models/interface-models';
import { identifierModuleUrl } from '@angular/compiler';
import { Dish } from '../models/dish.model';
import { EmailValidator } from '@angular/forms';

const BACKEND_URL = environment.apiUrl + "/profile/";



@Injectable({providedIn: 'root'})
export class ProfileService {
    constructor (private http: HttpClient, private router: Router, private authService: AuthService) {}

    private _profile: User;
    private _userCrews: Crew[];
    private _userEvents: EventActivity[];
    
    public get profile() {
        return this._profile;
    }

    public set profile(profile: User) {
        this._profile = profile;
    }

    public get userCrews() {
        return this._userCrews;
    }

    public set userCrews(userCrews: Crew[]) {
        this._userCrews = userCrews;
    }

    public get userEvents() {
        return this._userEvents;
    }

    public set userEvents(userEvents: EventActivity[]) {
        this._userEvents = userEvents;
    }

    createProfile(email: string)
    {
        console.log(email);
        const profileData = new FormData();
        profileData.append("email", email);
        profileData.append("name", "");
        profileData.append("bio", "");
        profileData.append("image", "");

        // const profileData: User = {
        //     email: email,
        //     name: "",
        //     bio: "",
        //     image: ""
        // };
        console.log(profileData);
        return this.http.post<{message: string, user: User}>(BACKEND_URL, profileData)
        .subscribe((responseData) => {
           this.router.navigate(['/auth/login']);
        }, error => {
           console.log(error);
           return;
        });
    }


    fetchProfile(email: string) 
    {
        console.log("here");

        return this.http.get<{
            _id: string;
            email: string; 
            name: string; 
            bio: string; 
            image: string;
        }>(BACKEND_URL + email);
    }

    updateProfile(id: string, email: string, name: string, bio: string, image: File | string){
        let profileData: User | FormData;
        if(typeof(image) === 'object')
        {
            profileData = new FormData();
            profileData.append("id", id);
            profileData.append("email", email);
            profileData.append("name", name);
            profileData.append("bio", bio);
            profileData.append("image", image, name);

        }
        else
        {
            profileData = {
                id: id,
                email: email,
                name: name,
                bio: bio,
                image: image
            };
        }
        this.http.put(BACKEND_URL + id, profileData)
        .subscribe(response => {
            this.router.navigate(["/profile"]);
        });

    }

    getProfileUpdateListener()
    {
        // return this.profileUpdated.asObservable();
    }

}