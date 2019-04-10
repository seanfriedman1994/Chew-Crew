import { EventActivity, User } from '../models/interface-models';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from "../../environments/environment";

const BACKEND_URL = environment.apiUrl + "/events/";

@Injectable({providedIn: 'root'})
export class EventsService {
    private events: EventActivity[] = [];
    private userEvents: EventActivity[] = [];
    private eventMembers: User[] = [];
    private eventMembersUpdated = new Subject<{eventMembers: User[], eventMembersCount: number}>();
    private userEventsUpdated  = new Subject<{userEvents: EventActivity[], userEventCount: number}>();
    private eventsUpdated = new Subject<{events: EventActivity[], eventCount: number}>();

    constructor(private http: HttpClient, private router: Router){}

    addEvent(name: string, date: string, location: string, description: string, crewId: string) 
    {
        const eventData = new FormData();
        eventData.append("name", name);
        eventData.append("date", date);
        eventData.append("location", location);
        eventData.append("description", description);
        eventData.append("crewId", crewId);

        console.log(eventData.get("date"));

        return this.http.post<{message: string, event: EventActivity}>(BACKEND_URL, eventData)
        .subscribe((responseData) => {
            console.log(responseData);
            this.router.navigate(["/crews/" + crewId]);
        });
    }

    getEvents(eventsPerPage: number, currentPage: number, crewId: string) 
    {
        const queryParams = `?pageSize=${eventsPerPage}&page=${currentPage}&crewId=${crewId}`;
        this.http
        .get<{message: string; events: any, maxEvents: number}>(
            BACKEND_URL + queryParams
        )
        .pipe(map((eventData) => {
            return { 
                events: eventData.events.map(event => {
                return {
                    name: event.name,
                    description: event.description,
                    date: event.date,
                    location: event.location,
                    id: event._id,
                    creator: event.creator,
                    crewId: event.crewId
                };
            }), 
            maxEvents: eventData.maxEvents
        };
        }))
        .subscribe(transformedEventData => {
            this.events = transformedEventData.events;
            this.eventsUpdated.next({
                events: [...this.events], eventCount: transformedEventData.maxEvents
            });
        });
    }

    getEventsList(eventsPerPage: number, currentPage: number)
    {
        const queryParams = `?pageSize=${eventsPerPage}&page=${currentPage}`;
        this.http
        .get<{message: string; events: any, maxEvents: number}>(
            BACKEND_URL + queryParams
        )
        .pipe(map((eventData) => {
            return { 
                events: eventData.events.map(event => {
                return {
                    name: event.name,
                    description: event.description,
                    date: event.date,
                    location: event.location,
                    id: event._id,
                    creator: event.creator,
                    crewId: event.crewId
                };
            }), 
            maxEvents: eventData.maxEvents
        };
        }))
        .subscribe(transformedEventData => {
            this.events = transformedEventData.events;
            this.eventsUpdated.next({
                events: [...this.events], eventCount: transformedEventData.maxEvents
            });
        });
    }

    getUserEvents(eventsPerPage: number, currentPage: number, profileId: string) 
    {
        const queryParams = `?pageSize=${eventsPerPage}&page=${currentPage}&profileId=${profileId}`;
        this.http
        .get<{message: string; events: any, maxEvents: number}>(
            BACKEND_URL + queryParams
        )
        .pipe(map((eventData) => {
            return { 
                events: eventData.events.map(event => {
                return {
                    name: event.name,
                    description: event.description,
                    date: event.date,
                    location: event.location,
                    id: event._id,
                    creator: event.creator,
                    crewId: event.crewId
                };
            }), 
            maxEvents: eventData.maxEvents
        };
        }))
        .subscribe(transformedUserEventData => {
            this.userEvents = transformedUserEventData.events;
            this.userEventsUpdated.next({
                userEvents: [...this.userEvents], userEventCount: transformedUserEventData.maxEvents
            });
        });
    }

    getEventUpdateListener()
    {
        return this.eventsUpdated.asObservable();
    }

    getEventMembersUpdateListener()
    {
        return this.eventMembersUpdated.asObservable();
    }

    getUserEventUpdateListener()
    {
        return this.userEventsUpdated.asObservable();
    }

    getEvent(id: string) 
    {

        return this.http.get<{
            _id: string; 
            name: string; 
            location: string;
            date: string;
            description: string;
            creator: string;
            crewId: string;
        }>(BACKEND_URL + id);
    }

    joinEvent(eventId: string, profileId: string)
    {
        const userEventData = new FormData();
        userEventData.append("eventId", eventId);
        userEventData.append("profileId", profileId);

        return this.http.post<{message: string}>(BACKEND_URL + profileId, userEventData);
    }

    leaveEvent(eventId: string, profileId: string)
    {
        return this.http.delete(BACKEND_URL + eventId + "/" + profileId);
    }

    getEventMembers(eventId: string){
        const queryParams = `?eventId=${eventId}`;
        this.http
        .get<{message: string; eventMembers: any; maxEventMembers: number}>(
            BACKEND_URL + queryParams
        )
        .pipe(map((eventMemberData) => {
            return { 
                eventMembers: eventMemberData.eventMembers.map(eventMember => {
                return {
                    id: eventMember._id,
                    email: eventMember.email,
                    name: eventMember.name,
                    bio: eventMember.bio,
                    image: eventMember.image,
                };
            }),
            maxEventMembers: eventMemberData.maxEventMembers
        };
        }))
        .subscribe(transformedUserEventData => {
            this.eventMembers = transformedUserEventData.eventMembers;
            this.eventMembersUpdated.next({
                eventMembers: [...this.eventMembers], eventMembersCount: transformedUserEventData.maxEventMembers
            });
        });
    }

    updateEvent(id: string, name: string, date: string, location: string, description: string){
        let eventData: EventActivity | FormData;
        eventData = new FormData();
        eventData.append("id", id);
        eventData.append("name", name);
        eventData.append("date", date);
        eventData.append("location", location);
        eventData.append("description", description);

        this.http.put(BACKEND_URL + id, eventData)
        .subscribe(response => {
            this.router.navigate(["/events/" + id]);
            //look at this
        });

    }

    deleteEvent(eventId: string, crewId: string) {
        return this.http.delete(BACKEND_URL + eventId).subscribe(response => {
            console.log(response);
            this.router.navigate(["/crews/" + crewId]);
        });
    }
}