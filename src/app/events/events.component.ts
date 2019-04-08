import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models/interface-models';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { Crew } from '../models/interface-models';
import { EventsService } from '../events/events.service';
import { AuthService } from '../auth/auth.service';
import { EventActivity } from '../models/interface-models';
import { CrewsService } from '../crews/crews.service';
import { ProfileService } from '../profile/profile.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Dish } from '../models/dish.model';
import { DishesService } from '../dishes/dishes.service';




@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})

@Injectable()
export class EventsComponent implements OnInit, OnDestroy {

  crewMembers: User[] = [];
  dishes: Dish[] = [];
  isAttending = false;
  event: EventActivity;
  eventMembers: User[] = [];
  isLoading = false;
  userIsAuthenticated = false;
  userId: string;
  profileId: string;
  eventId: string;
  crew: Crew;
  crewId: string;
  totalDishes = 0;
  dishesPerPage = 3;
  pageSizeOptions = [1,3,5,10];
  currentPage = 1;
  totalEventMembers: number;
  private eventsSub: Subscription;
  private authStatusSub: Subscription;
  private eventMembersSub: Subscription;
  private dishesSub: Subscription;
  
  constructor(public route: ActivatedRoute, 
    public eventsService: EventsService, 
    public profileService: ProfileService,
    public crewsService: CrewsService, 
    public dishesService: DishesService,
    private authService: AuthService) { }

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

            this.dishesService.getEventDishes(this.dishesPerPage, this.currentPage, this.event.id);
            this.dishesSub = this.dishesService.getEventDishUpdateListener()
            .subscribe((dishData: {eventDishes: Dish[], eventDishCount: number}) => {
                this.isLoading = false;
                this.totalDishes = dishData.eventDishCount;
                this.dishes = dishData.eventDishes;
                });
          });
        }else
        {
          this.eventId = null;
        }
      });

      this.profileId = localStorage.getItem("profileId");
  
      if(this.profileService.userEvents)
      {
        this.profileService.userEvents.forEach(item => {
          if(this.eventId === item.id)
          {
            this.isAttending = true;
          }
        });
      }


      this.userId = this.authService.getUserId();
      this.userIsAuthenticated = this.authService.getIsAuth();
      console.log(this.userIsAuthenticated);
      this.authStatusSub = this.authService.getAuthStatusListener()
          .subscribe(isAuthenticated => {
            this.userIsAuthenticated = isAuthenticated;
            this.userId = this.authService.getUserId();
          });

      


      this.eventsService.getEventMembers(this.eventId);
      this.eventMembersSub = this.eventsService.getEventMembersUpdateListener()
        .subscribe((eventMemberData: {eventMembers: User[], eventMembersCount: number}) => {
            this.totalEventMembers = eventMemberData.eventMembersCount;
            this.eventMembers =eventMemberData.eventMembers;
            console.log(this.eventMembers);
        });
    }

    joinOrLeaveEvent()
    {
      if(!this.isAttending)
      {
        this.isLoading = true;
        this.isAttending = true;
        this.eventsService.joinEvent(this.event.id, this.profileId);
        this.isLoading = false;
      }
      else
      {
        this.isLoading = true;
        this.isAttending = false;
        this.eventsService.leaveEvent(this.event.id, this.profileId);
        this.isLoading = false;
      }
      
    }
  
    onDelete(eventId: string, crewId: string) 
    {
      this.isLoading = true;
      this.eventsService.deleteEvent(eventId, crewId);
    }
  
    ngOnDestroy()
    {
      this.authStatusSub.unsubscribe();
      this.eventMembersSub.unsubscribe();
    }
  }
  