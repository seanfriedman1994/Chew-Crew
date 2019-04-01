import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from "../../environments/environment";

import { AuthService } from '../auth/auth.service';
import { User} from '../models/interface-models';
import { identifierModuleUrl } from '@angular/compiler';
import { Dish } from '../models/dish.model';
import { EmailValidator } from '@angular/forms';

const BACKEND_URL = environment.apiUrl + "/profile/";

@Injectable({providedIn: 'root'})
export class ProfileService {
    constructor (private http: HttpClient, private router: Router, private authService: AuthService) {}

    private user: User;
    //private userId: string;
    private userDishes: Dish[] = [];
    //groups of users (crews) should be User array?
    private userCrews: User[] = [];
    //private events: userEvent[] = [];
    private userUpdated = new Subject<User>();



    createProfile(email: string)
    {
        console.log(email);
        console.log("hereddd");
        const profileData: User = {
            email: email,
            name: "",
            bio: "",
            image: ""
        };
        console.log(profileData);
        return this.http.post<User>(BACKEND_URL, profileData)
        .subscribe(() => {
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
            email: string; 
            name: string; 
            bio: string; 
            image: string;
        }>(BACKEND_URL + email);
    }

    getProfileUpdateListener()
    {
        // return this.profileUpdated.asObservable();
    }

}