import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
<<<<<<< HEAD
import { AuthData, EventActivity } from '../models/interface-models';
=======
import { AuthData } from '../models/interface-models';
>>>>>>> e4624b39072281853e1ccac3a466139ae5c621ac
import { User } from '../models/interface-models';
import { AuthService } from '../auth/auth.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ProfileService } from './profile.service';
import { ParamMap } from '@angular/router';
<<<<<<< HEAD
import { Crew} from '../models/interface-models';
import { CrewsService } from '../crews/crews.service';
import { PageEvent } from '@angular/material';
import { EventsService } from '../events/events.service';

=======
import { Crew } from '../models/interface-models';
>>>>>>> e4624b39072281853e1ccac3a466139ae5c621ac



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
<<<<<<< HEAD
  crews: Crew[] = [];
  userCrews: Crew[] = [];
  userEvents: EventActivity[] = [];
=======
  crewMembers: Crew[] = [];
  userCrews: Crew[] = [];
>>>>>>> e4624b39072281853e1ccac3a466139ae5c621ac
  private userId: string;
  private email: string = "";
  private profileSub: Subscription;
  form: FormGroup;
  userIsAuthenticated = false;
  private authStatusSub: Subscription;
<<<<<<< HEAD
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

  constructor(private route: ActivatedRoute, 
    public profileService: ProfileService, 
    private authService: AuthService, 
    public crewsService: CrewsService,
    public eventsService: EventsService) { }
=======

  constructor(private route: ActivatedRoute, 
    private profileService: ProfileService, private authService: AuthService) { }
>>>>>>> e4624b39072281853e1ccac3a466139ae5c621ac

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
    console.log(this.email);

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
<<<<<<< HEAD
      console.log(this.profile.id);
      localStorage.setItem("profileId", this.profile.id);


      this.crewsService.getUserCrews(this.profile.id, this.userCrewsPerPage, this.currentPage);
      this.userCrewsSub = this.crewsService.getUserCrewUpdateListener()
      .subscribe((crewData: {userCrews: Crew[], userCrewCount: number}) => {
          this.totalUserCrews = crewData.userCrewCount;
          this.userCrews = crewData.userCrews;
          console.log(this.userCrews);
          console.log(this.totalUserCrews);

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


=======
    });

  }

>>>>>>> e4624b39072281853e1ccac3a466139ae5c621ac
  ngOnDestroy()
  {
    this.profileSub.unsubscribe();
    this.authStatusSub.unsubscribe();
<<<<<<< HEAD
    this.userCrewsSub.unsubscribe();
    this.userEventsSub.unsubscribe();
=======
>>>>>>> e4624b39072281853e1ccac3a466139ae5c621ac
  }
}
