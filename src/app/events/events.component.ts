import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models/interface-models';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { Crew } from '../models/interface-models';
import { EventsService } from '../events/events.service';
import { AuthService } from '../auth/auth.service';
import { EventActivity } from '../models/interface-models';
import { CrewsService } from '../crews/crews.service';




@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})

@Injectable()
export class EventsComponent implements OnInit, OnDestroy {

  crewMembers: User[] = [];
  event: EventActivity;
  isLoading = false;
  userIsAuthenticated = false;
  userId: string;
  eventId: string;
  crew: Crew;
  crewId: string;
  private eventsSub: Subscription;
  private authStatusSub: Subscription;


  constructor(public route: ActivatedRoute, public eventsService: EventsService, public crewsService: CrewsService, private authService: AuthService) { }

    ngOnInit() 
    {
  
      this.route.paramMap.subscribe((paramMap: ParamMap) => 
      {
        if(paramMap.has('eventId')) 
        {

          this.eventId = paramMap.get('eventId');

          this.isLoading = true;
          this.eventsService.getEvent(this.eventId).subscribe(eventData => { 
            this.isLoading = false;
            this.event = 
            {
              id: eventData._id, 
              name: eventData.name, 
              date: eventData.date,
              location: eventData.location,
              description: eventData.description,
              creator: eventData.creator,
              crewId: eventData.crewId
            };
            console.log(this.event);
          });
        }else
        {
          this.eventId = null;
        }
      });
  
      this.userId = this.authService.getUserId();
      this.userIsAuthenticated = this.authService.getIsAuth();
      console.log(this.userIsAuthenticated);
      this.authStatusSub = this.authService.getAuthStatusListener()
          .subscribe(isAuthenticated => {
            this.userIsAuthenticated = isAuthenticated;
            this.userId = this.authService.getUserId();
          });
    }
  
    onDelete(eventId: string, crewId: string) 
    {
      this.isLoading = true;
      this.eventsService.deleteEvent(eventId, crewId);
    }
  
    ngOnDestroy()
    {
      this.authStatusSub.unsubscribe();
    }
  }
  