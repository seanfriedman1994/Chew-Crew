import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AuthData, EventActivity } from '../models/interface-models';
import { User } from '../models/interface-models';
import { AuthService } from '../auth/auth.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ProfileService } from './profile.service';
import { ParamMap } from '@angular/router';
import { Crew} from '../models/interface-models';
import { Dish } from '../models/dish.model';
import { CrewsService } from '../crews/crews.service';
import { PageEvent } from '@angular/material';
import { EventsService } from '../events/events.service';
import { DishesService } from '../dishes/dishes.service';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

@Injectable()
export class ProfileComponent implements OnInit, OnDestroy {
  isLoading = false;

  profile: User;
  isUser: boolean;
  crews: Crew[] = [];
  userCrews: Crew[] = [];
  userEvents: EventActivity[] = [];
  private userId: string;
  private email: string = "";
  private profileSub: Subscription;
  form: FormGroup;
  userIsAuthenticated = false;
  private authStatusSub: Subscription;
  private userCrewsSub: Subscription;
  private userEventsSub: Subscription;
  totalUserCrews = 0;
  totalUserEvents = 0;
  userEventsPerPage = 3;
  userCrewsPerPage = 3;
  pageSizeOptions = [1,3,5,10];
  eventPageSizeOptions = [1,3,5,10];
  currentPage = 1;
  currentEventPage = 1;
  dishes: Dish[] = [];
  profileId: string;
  totalDishes = 0;
  dishesPerPage = 3;
  currentDishPage = 1;
  private dishesSub: Subscription;

  constructor(private route: ActivatedRoute, 
    public profileService: ProfileService, 
    private authService: AuthService, 
    public crewsService: CrewsService,
    public eventsService: EventsService,
    public dishesService: DishesService) { }

  ngOnInit() 
  {
    this.isLoading = true;

    this.userId = this.authService.getUserId();
    this.userIsAuthenticated = this.authService.getIsAuth();
    console.log(this.userIsAuthenticated);
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        console.log(isAuthenticated);
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });


    this.email = localStorage.getItem("email");
    console.log("email" + this.email);

    this.profileSub = this.profileService.fetchProfile(this.email).subscribe(profileData => {
      console.log(profileData);
      this.isLoading = false;
      this.profile = 
      {
        id: profileData._id,
        email: profileData.email,
        name: profileData.name, 
        bio: profileData.bio,
        image: profileData.image,
      };
      console.log("profileId" + this.profile.id);
      localStorage.setItem("profileId", this.profile.id);
      const loggedInUser = {id: profileData._id, email: profileData.email, name: profileData.name, bio: profileData.bio, image: profileData.image};
      this.profileService.profile = loggedInUser;
      this.authService.getAuthStatusListenerRawValue().next(true)


      this.crewsService.getUserCrews(this.profile.id, this.userCrewsPerPage, this.currentPage);
      this.userCrewsSub = this.crewsService.getUserCrewUpdateListener()
      .subscribe((crewData: {userCrews: Crew[], userCrewCount: number}) => {
          this.totalUserCrews = crewData.userCrewCount;
          this.userCrews = crewData.userCrews;
          console.log("usercrews" + this.userCrews);
          console.log("total usercrews" + this.totalUserCrews);

          this.profileService.userCrews = this.userCrews;
        });

        this.eventsService.getUserEvents(this.userEventsPerPage, this.currentPage, this.profile.id);
        this.userEventsSub = this.eventsService.getUserEventUpdateListener()
          .subscribe((userEventData: {userEvents: EventActivity[], userEventCount: number}) => {
            this.totalUserEvents = userEventData.userEventCount;
            this.userEvents = userEventData.userEvents;

            this.profileService.userEvents = this.userEvents;
          });

          this.profileService.profile = this.profile;

          this.dishesService.getFavoriteDishes(this.profile.id, this.dishesPerPage, this.currentDishPage);
          this.dishesSub = this.dishesService.getFavoriteDishUpdateListener()
          .subscribe((favoriteDishData: {favoriteDishes: Dish[], favoriteDishCount: number}) => {
            this.totalDishes = favoriteDishData.favoriteDishCount;
            this.dishes = favoriteDishData.favoriteDishes;

          });

    });


  }

  onChangedPageCrews(pageData: PageEvent)
  {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.userCrewsPerPage = pageData.pageSize;
    this.crewsService.getUserCrews(this.profile.id, this.userCrewsPerPage, this.currentPage);
    this.isLoading = false;
  }

  onChangedPageEvents(pageData: PageEvent)
  {
    this.isLoading = true;
    this.currentEventPage = pageData.pageIndex + 1;
    this.userEventsPerPage = pageData.pageSize;
    this.eventsService.getUserEvents(this.userEventsPerPage, this.currentEventPage, this.profile.id);
    this.isLoading = false;
  }

  onChangedPageDishes(pageData: PageEvent)
  {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.dishesPerPage = pageData.pageSize;
    this.dishesService.getFavoriteDishes(this.profile.id, this.dishesPerPage, this.currentPage);
    this.isLoading = false;
  }


  ngOnDestroy()
  {
    this.profileSub.unsubscribe();
    this.authStatusSub.unsubscribe();
    this.userCrewsSub.unsubscribe();
    this.userEventsSub.unsubscribe();
    this.dishesSub.unsubscribe();
  }
}