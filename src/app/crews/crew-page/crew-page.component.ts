import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Crew } from '../../models/interface-models';
import { CrewsService } from '../crews.service';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from '../../models/interface-models';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EventActivity } from '../../models/interface-models';
import { EventsService } from '../../events/events.service';
import { ProfileService } from 'src/app/profile/profile.service';


@Component({
  selector: 'app-crew-page',
  templateUrl: './crew-page.component.html',
  styleUrls: ['./crew-page.component.css']
})
export class CrewPageComponent implements OnInit, OnDestroy{

  crewMembers: User[] = [];
  events: EventActivity[] = [];
  isLoading = false;
  isMember = false;
  userIsAuthenticated = false;
  userId: string;
  profileId: string;
  crew: Crew;
  totalEvents = 0;
  eventsPerPage = 3;
  pageSizeOptions = [1,3,5,10];
  currentPage = 1;
  totalCrewMembers = 0;
  private eventsSub: Subscription;
  private authStatusSub: Subscription;
  private crewMembersSub: Subscription;
  private crewId: string;

  constructor(public crewsService: CrewsService, 
    public eventsService: EventsService, 
    public profileService: ProfileService,
    private authService: AuthService, 
    public route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() 
  {
    this.route.paramMap.subscribe((paramMap: ParamMap) => 
    {
      if(paramMap.has('crewId')) 
      {
        this.crewId = paramMap.get('crewId');
        this.isLoading = true;
        localStorage.setItem("crewId", this.crewId);
        this.crewsService.getCrew(this.crewId).subscribe(crewData => { 
          this.isLoading = false;
          this.crew = 
          {
            id: crewData._id, 
            name: crewData.name, 
            description: crewData.description,
            image: crewData.image,
            creator: crewData.creator
          };
        });

        this.crewsService.getCrewMembers(this.crewId);
        this.crewMembersSub = this.crewsService.getCrewMembersUpdateListener()
          .subscribe((crewMemberData: {crewMembers: User[], crewMemberCount: number}) => {
              this.totalCrewMembers = crewMemberData.crewMemberCount;
              this.crewMembers = crewMemberData.crewMembers;
              console.log(this.crewMembers);
    
              this.profileId = localStorage.getItem("profileId");
              console.log("profileId" + this.profileId);

              if(this.profileId)
              {
                this.crewMembers.forEach(item => {
                  if(this.profileId === item.id)
                  {
                    this.isMember = true;
                    console.log(this.isMember);
                  }
                })
              }




          
        });
        
      }else
      {
        this.crewId = null;
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
    

    this.eventsService.getEvents(this.eventsPerPage, this.currentPage, this.crewId);
        this.eventsSub = this.eventsService.getEventUpdateListener()
          .subscribe((eventData: {events: EventActivity[], eventCount: number}) => {
            this.isLoading = false;
            this.totalEvents = eventData.eventCount;
            this.events = eventData.events;
          });
  }

  onDelete(crewId: string) 
  {
    this.isLoading = true;
    this.crewsService.deleteCrew(crewId).subscribe(() => {
      this.isLoading = false;
      this.router.navigate(["/crews"]);
    });
  }

  onLeave(crewId: string)
  {
    this.isLoading = true;
    this.crewsService.leaveCrew(crewId, this.profileId).subscribe(() => {
      this.isLoading = false;
      this.crewsService.getCrewMembers(this.crewId);
        this.crewMembersSub = this.crewsService.getCrewMembersUpdateListener()
          .subscribe((crewMemberData: {crewMembers: User[], crewMemberCount: number}) => {
              this.totalCrewMembers = crewMemberData.crewMemberCount;
              this.crewMembers = crewMemberData.crewMembers;
              console.log(this.crewMembers);
    
              this.profileId = localStorage.getItem("profileId");
              console.log("leave profileId" + this.profileId);

              this.isMember = false;
          
        });
    });
  }

  onJoin(crewId: string)
  {
    this.isLoading = true;
    this.crewsService.joinCrew(crewId, this.profileId).subscribe(() => {
      this.isLoading = false;
      this.crewsService.getCrewMembers(this.crewId);
        this.crewMembersSub = this.crewsService.getCrewMembersUpdateListener()
          .subscribe((crewMemberData: {crewMembers: User[], crewMemberCount: number}) => {
              this.totalCrewMembers = crewMemberData.crewMemberCount;
              this.crewMembers = crewMemberData.crewMembers;
              console.log(this.crewMembers);
    
              this.profileId = localStorage.getItem("profileId");
              console.log("profileId" + this.profileId);

              if(this.profileId)
              {
                this.crewMembers.forEach(item => {
                  if(this.profileId === item.id)
                  {
                    this.isMember = true;
                    console.log(this.isMember);
                  }
                })
              }

        });
        
    });
  }
  
  ngOnDestroy()
  {
    this.eventsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}