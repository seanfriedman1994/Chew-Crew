import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EventActivity } from '../../models/interface-models';
import { EventsService } from '../../events/events.service';
import { PageEvent } from '@angular/material';



@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit, OnDestroy {
  events: EventActivity[] = [];
  isLoading = false;
  userIsAuthenticated = false;
  userId: string;
  profileId: string;
  totalEvents = 0;
  eventsPerPage = 3;
  pageSizeOptions = [1,3,5,10];
  currentPage = 1;
  totalCrewMembers = 0;
  private eventsSub: Subscription;
  private authStatusSub: Subscription;

  constructor( public eventsService: EventsService, private authService: AuthService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.isLoading = true;
    this.eventsService.getEventsList(this.eventsPerPage, this.currentPage);
    this.eventsSub = this.eventsService.getEventUpdateListener()
      .subscribe((eventData: {events: EventActivity[], eventCount: number}) => {
        this.isLoading = false;
        this.totalEvents = eventData.eventCount;
        this.events = eventData.events;
      });

    this.profileId = localStorage.getItem("profileId");

    this.userId = this.authService.getUserId();
    this.userIsAuthenticated = this.authService.getIsAuth();
    console.log(this.userIsAuthenticated);
    this.authStatusSub = this.authService.getAuthStatusListener()
        .subscribe(isAuthenticated => {
          this.userIsAuthenticated = isAuthenticated;
          this.userId = this.authService.getUserId();
        });
  }

  onChangedPage(pageData: PageEvent)
  {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.eventsPerPage = pageData.pageSize;
    this.eventsService.getEventsList(this.eventsPerPage, this.currentPage);
  }

  ngOnDestroy() 
  {
    this.eventsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
