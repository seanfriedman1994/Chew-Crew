import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject, ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from "../../environments/environment";
import { distinctUntilChanged } from 'rxjs/operators';
import { strictEqual } from 'assert';
import { stringify } from 'querystring';
import { Observable } from 'rxjs';
import {AuthData} from "../models/interface-models";

const BACKEND_URL = environment.apiUrl + "/user";
 
@Injectable({ providedIn: "root"})
export class AuthService 
{
    private isAuthenticated = false;
    private token: string;
    private tokenTimer: any;
    private userId: string;
    private email: string;
    private authStatusListener = new Subject<boolean>();
    private authData : AuthData;

    //public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();


    constructor(private http: HttpClient, private router: Router) {}

    getToken() 
    {
        return this.token;
    }

    getIsAuth()
    {
        return this.isAuthenticated;
    }

    getUserId()
    {
        return this.userId;
    }

    getAuthStatusListener() 
    {
        return this.authStatusListener.asObservable();
    }

    createUser(email: string, password: string)
    {
        const authData: AuthData = {
            email: email,
            password: password
        };
        this.http.post(BACKEND_URL + "/signup", authData)
        .subscribe(() => {
            this.router.navigate(['/auth/login']);
        }, error => {
            this.authStatusListener.next(false);
        });
    }

    login(email: string, password: string)
    {
        const authData: AuthData = {
            email: email,
            password: password,
        };
        this.http.post<{token: string, expiresIn: number, userId: string}>
        (BACKEND_URL + "/login", authData)
        .subscribe(response => {
            const token = response.token;
            this.token = token;
            if(token)
            {
                const expiresInDuration = response.expiresIn;
                this.setAuthTimer(expiresInDuration);
                this.isAuthenticated = true;
                this.userId = response.userId;
                this.authStatusListener.next(true);
                const now = new Date();
                const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                console.log(this.userId);
                console.log(email);
                this.saveAuthData(token, expirationDate, this.userId, email);
                //navigate to profile page after login
                this.router.navigate(['/profile']);
            }
        }, error => {
            this.authStatusListener.next(false);
        });
    }

    // createLoginToken()
    // {
    //     const expiresInDuration = response.expiresIn;
    //     this.setAuthTimer(expiresInDuration);
    //     this.isAuthenticated = true;
    //     this.userId = response.userId;
    //     this.authStatusListener.next(true);
    //     const now = new Date();
    //     const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
    //     this.saveAuthData(token, expirationDate, this.userId);
    // }

    //allows user to leave page and come back to webpage without logging back in (within 1 hour)
    autoAuthUser()
    {
        const authInformation = this.getAuthData();
        if(!authInformation)
        {
            return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0)
        {
            this.token = authInformation.token;
            this.isAuthenticated = true;
            this.userId = authInformation.userId;
            this.setAuthTimer(expiresIn / 1000);
            this.authStatusListener.next(true);
            this.email = authInformation.email;
        }
    }

    logout()
    {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        //navigate to home page after logout
        clearTimeout(this.tokenTimer);
        this.userId = null;
        this.clearAuthData();
        this.router.navigate(['/']);
    }

    // getCurrentUser(): AuthData {
    //     return this.currentUserSubject.value;
    //   }

    private setAuthTimer(duration: number)
    {
        console.log("Setting timer: " + duration);
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, duration * 1000);
    }

    private saveAuthData(token: string, expirationDate: Date, userId: string, email: string)
    {
        localStorage.setItem("token", token);
        localStorage.setItem("expiration", expirationDate.toISOString());
        localStorage.setItem("userId", userId);
        localStorage.setItem("email", email);
    }

    

    private clearAuthData()
    {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        localStorage.removeItem("userId");
        localStorage.removeItem("email");
    }

    private getAuthData()
    {
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expiration");
        const userId = localStorage.getItem("userId");
        const email = localStorage.getItem("email");
        console.log(email);
        if(!token || !expirationDate)
        {
            return;
        }
        return {
            token: token,
            expirationDate: new Date(expirationDate),
            userId: userId,
            email: email
        }
    }
}
