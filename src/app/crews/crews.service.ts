import { Crew } from '../models/interface-models';
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
    private crewsUpdated = new Subject<{crews: Crew[], crewCount: number}>();

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
            this.router.navigate(["/crews/" + id]);
        });

    }

    joinCrew(crewId: string)
    {
        const userCrewData = new FormData();
        userCrewData.append("crewId", crewId);

        this.http.post<{message: string}>(BACKEND_URL + crewId, userCrewData)
        .subscribe((responseData) => {
            console.log(responseData);
            this.router.navigate(["/crews/" + crewId]);
        });
    }

    deleteCrew(crewId: string) {
        return this.http.delete(BACKEND_URL + crewId).subscribe(response => {
            this.router.navigate(["/crews"]);
        });
    }
}