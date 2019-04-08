<<<<<<< HEAD
import { Crew, User} from '../models/interface-models';
=======
import { Crew } from '../models/interface-models';
>>>>>>> d2b6a0295e5e939b34e4f36963342e51c9bade08
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from "../../environments/environment";

const BACKEND_URL = environment.apiUrl + "/crews/";

@Injectable({providedIn: 'root'})
export class CrewsService {
    private crews: Crew[] = [];
<<<<<<< HEAD
    private userCrews: Crew[] = [];
    private crewMembers: User[] = [];
    private userCrewsUpdated = new Subject<{userCrews: Crew[], userCrewCount: number}>();
    private crewsUpdated = new Subject<{crews: Crew[], crewCount: number}>();
    private crewMembersUpdated = new Subject<{crewMembers: User[], crewMemberCount: number}>();

=======
    private crewsUpdated = new Subject<{crews: Crew[], crewCount: number}>();
>>>>>>> d2b6a0295e5e939b34e4f36963342e51c9bade08

    constructor(private http: HttpClient, private router: Router){}

    getCrews(crewsPerPage: number, currentPage: number) 
    {
        const queryParams = `?pageSize=${crewsPerPage}&page=${currentPage}`;
        this.http
        .get<{message: string; crews: any, maxCrews: number}>(
            BACKEND_URL + queryParams
        )
        .pipe(map((crewData) => {
            return { 
                crews: crewData.crews.map(crew => {
                return {
                    name: crew.name,
                    description: crew.description,
                    id: crew._id,
                    image: crew.image,
                    creator: crew.creator
                };
            }), 
            maxCrews: crewData.maxCrews
        };
        }))
        .subscribe(transformedCrewData => {
            this.crews = transformedCrewData.crews;
            this.crewsUpdated.next({
                crews: [...this.crews], crewCount: transformedCrewData.maxCrews
            });
        });
    }

    getCrewUpdateListener()
    {
        return this.crewsUpdated.asObservable();
    }

<<<<<<< HEAD
    getUserCrewUpdateListener()
    {
        return this.userCrewsUpdated.asObservable();
    }

    getCrewMembersUpdateListener()
    {
        return this.crewMembersUpdated.asObservable();
    }

=======
>>>>>>> d2b6a0295e5e939b34e4f36963342e51c9bade08
    getCrew(id: string) 
    {

        return this.http.get<{
            _id: string; 
            name: string; 
            description: string;
            image: string;
            creator: string;
        }>(BACKEND_URL + id);
    }

    addCrew(name: string, description: string, image: File) 
    {
        const crewData = new FormData();
        crewData.append("name", name);
        crewData.append("description", description);
        crewData.append("image", image, name);

        this.http.post<{message: string, crew: Crew}>(BACKEND_URL, crewData)
        .subscribe((responseData) => {
            this.router.navigate(["/crews"]);
        });
    }

    updateCrew(id: string, name: string, description: string, image: File | string){
        let crewData: Crew | FormData;
        if(typeof(image) === 'object')
        {
            crewData = new FormData();
            crewData.append("id", id);
            crewData.append("name", name);
            crewData.append("description", description);
            crewData.append("image", image, name);

        }
        else
        {
            crewData = {
                id: id,
                name: name,
                description,
                image: image,
                creator: null
            };
        }
        this.http.put(BACKEND_URL + id, crewData)
        .subscribe(response => {
<<<<<<< HEAD
            this.router.navigate(["/crews/" + id]);
        });

    }

    getUserCrews(profileId: string, userCrewsPerPage: number, currentPage: number){
        const queryParams = `?pageSize=${userCrewsPerPage}&page=${currentPage}&profileId=${profileId}`;
        this.http
        .get<{message: string; crews: any, maxCrews: number}>(
            BACKEND_URL + queryParams
        )
        .pipe(map((crewData) => {
            return { 
                crews: crewData.crews.map(crew => {
                return {
                    id: crew._id,
                    name: crew.name,
                    description: crew.description,
                    image: crew.image,
                    creator: crew.creator
                };
            }), 
            maxCrews: crewData.maxCrews
        };
        }))
        .subscribe(transformedCrewData => {
            this.userCrews = transformedCrewData.crews;
            this.userCrewsUpdated.next({
                userCrews: [...this.userCrews], userCrewCount: transformedCrewData.maxCrews
            });
        });
    }

    getCrewMembers(crewId: string){
        const queryParams = `?crewId=${crewId}`;
        this.http
        .get<{message: string; crewMembers: any; maxCrewMembers: number}>(
            BACKEND_URL + queryParams
        )
        .pipe(map((crewMemberData) => {
            return { 
                crewMembers: crewMemberData.crewMembers.map(crewMember => {
                return {
                    id: crewMember._id,
                    email: crewMember.email,
                    name: crewMember.name,
                    bio: crewMember.bio,
                    image: crewMember.image,
                };
            }),
            maxCrewMembers: crewMemberData.maxCrewMembers
        };
        }))
        .subscribe(transformedUserCrewData => {
            this.crewMembers = transformedUserCrewData.crewMembers;
            this.crewMembersUpdated.next({
                crewMembers: [...this.crewMembers], crewMemberCount: transformedUserCrewData.maxCrewMembers
            });
        });
    }

    joinCrew(crewId: string, profileId: string)
    {
        const userCrewData = new FormData();
        userCrewData.append("crewId", crewId);
        userCrewData.append("profileId", profileId);

        this.http.post<{message: string}>(BACKEND_URL + profileId, userCrewData)
        .subscribe((responseData) => {
            console.log(responseData);

            this.router.navigate(["/crews/" + crewId]);
=======
            this.router.navigate(["/crews"]);
>>>>>>> d2b6a0295e5e939b34e4f36963342e51c9bade08
        });

<<<<<<< HEAD
    leaveCrew(crewId: string, profileId: string)
    {
        return this.http.delete(BACKEND_URL + crewId + "/" + profileId).subscribe(response => {
            console.log(response);
            this.router.navigate(["/crews/" + crewId]);
        });
    }

    deleteCrew(crewId: string) 
    {
        return this.http.delete(BACKEND_URL + crewId).subscribe(response => {
            this.router.navigate(["/crews"]);
        });
=======
    }

    deleteCrew(crewId: string) {
        return this.http.delete(BACKEND_URL + crewId);
>>>>>>> d2b6a0295e5e939b34e4f36963342e51c9bade08
    }
}