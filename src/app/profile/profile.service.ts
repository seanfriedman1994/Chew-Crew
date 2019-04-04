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
    private id: string;
    //private userId: string;
    private userDishes: Dish[] = [];
    //groups of users (crews) should be User array?
    private userCrews: User[] = [];
    //private events: userEvent[] = [];
    private userUpdated = new Subject<User>();



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
        return this.http.get<{
            _id: string;
            email: string; 
            name: string; 
            bio: string; 
            image: string;
        }>(BACKEND_URL + email);
    }

    fetchUserCrews(userId: string)
    {
        console.log(userId);

        return this.http.get<{
            _id: string; 
            name: string; 
            description: string;
            image: string;
            creator: string;
        }>(BACKEND_URL + userId);
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