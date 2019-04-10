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
import { PageEvent } from '@angular/material';





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
  totalEventMembers = 0;
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

            localStorage.setItem("eventId", this.event.id);
            console.log(this.event.id);
            this.dishesService.getEventDishes(this.dishesPerPage, this.currentPage, this.event.id);
            this.dishesSub = this.dishesService.getEventDishUpdateListener()
            .subscribe((dishData: {eventDishes: Dish[], eventDishCount: number}) => {
                this.isLoading = false;
                this.totalDishes = dishData.eventDishCount;
                this.dishes = dishData.eventDishes;
                console.log(this.dishes);
                });
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

      


      this.eventsService.getEventMembers(this.eventId);
      this.eventMembersSub = this.eventsService.getEventMembersUpdateListener()
        .subscribe((eventMemberData: {eventMembers: User[], eventMembersCount: number}) => {
            this.totalEventMembers = eventMemberData.eventMembersCount;
            this.eventMembers =eventMemberData.eventMembers;
            console.log(this.eventMembers);

            this.profileId = localStorage.getItem("profileId");

            if(this.profileId)
              {
                this.eventMembers.forEach(item => {
                  if(this.profileId === item.id)
                  {
                    this.isAttending = true;
                    console.log(this.isAttending);
                  }
                })
              }

        });

    }

    joinOrLeaveEvent()
    {
      if(!this.isAttending)
      {
        this.isLoading = true;
        this.eventsService.joinEvent(this.event.id, this.profileId).subscribe(() => {
          this.isAttending = true;
          this.isLoading = false;
          this.eventsService.getEventMembers(this.eventId);
        this.eventMembersSub = this.eventsService.getEventMembersUpdateListener()
        .subscribe((eventMemberData: {eventMembers: User[], eventMembersCount: number}) => {
            this.totalEventMembers = eventMemberData.eventMembersCount;
            this.eventMembers =eventMemberData.eventMembers;
            console.log(this.eventMembers);

            this.profileId = localStorage.getItem("profileId");

            if(this.profileId)
              {
                this.eventMembers.forEach(item => {
                  if(this.profileId === item.id)
                  {
                    this.isAttending = true;
                    console.log(this.isAttending);
                  }
                })
              }
        });
      });

      }
      else
      {
        this.isLoading = true;
        this.eventsService.leaveEvent(this.event.id, this.profileId).subscribe(() => {
          this.isAttending = false;
          this.isLoading = false;
          this.eventsService.getEventMembers(this.eventId);
        this.eventMembersSub = this.eventsService.getEventMembersUpdateListener()
        .subscribe((eventMemberData: {eventMembers: User[], eventMembersCount: number}) => {
            this.totalEventMembers = eventMemberData.eventMembersCount;
            this.eventMembers =eventMemberData.eventMembers;
            console.log(this.eventMembers);

            this.profileId = localStorage.getItem("profileId");
        });
      });
      
    }
  }
  
    onDelete(eventId: string, crewId: string) 
    {
      this.isLoading = true;
      this.eventsService.deleteEvent(eventId, crewId);
    }

    onDeleteDish(dishId: string, eventId: string)
    {
      this.isLoading = true;
      this.dishesService.deleteDish(dishId).subscribe(() => {
      this.dishesService.getEventDishes(this.dishesPerPage, this.currentPage, eventId);
      }, () => {
        this.isLoading = false;
      });

    }

    onChangedPage(pageData: PageEvent)
    {
      this.isLoading = true;
      this.currentPage = pageData.pageIndex + 1;
      this.dishesPerPage = pageData.pageSize;
      this.dishesService.getEventDishes(this.dishesPerPage, this.currentPage, this.eventId);
    }
  
    ngOnDestroy()
    {
      this.authStatusSub.unsubscribe();
      this.eventMembersSub.unsubscribe();
      this.dishesSub.unsubscribe();
    }
  }
  