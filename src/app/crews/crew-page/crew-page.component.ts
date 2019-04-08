import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Crew } from '../../models/interface-models';
import { CrewsService } from '../crews.service';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from '../../models/interface-models';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EventActivity } from '../../models/interface-models';
<<<<<<< HEAD
import { EventsService } from '../../events/events.service';
import { ProfileService } from 'src/app/profile/profile.service';
=======
>>>>>>> d2b6a0295e5e939b34e4f36963342e51c9bade08


@Component({
  selector: 'app-crew-page',
  templateUrl: './crew-page.component.html',
  styleUrls: ['./crew-page.component.css']
})
export class CrewPageComponent implements OnInit, OnDestroy{

  crewMembers: User[] = [];
  events: EventActivity[] = [];
  isLoading = false;
<<<<<<< HEAD
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
=======
  userIsAuthenticated = false;
  userId: string;
  crew: Crew;
  private crewsSub: Subscription;
>>>>>>> d2b6a0295e5e939b34e4f36963342e51c9bade08
  private authStatusSub: Subscription;
  private crewId: string;

  constructor(public crewsService: CrewsService, private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit() 
  {
<<<<<<< HEAD
=======

>>>>>>> d2b6a0295e5e939b34e4f36963342e51c9bade08
    this.route.paramMap.subscribe((paramMap: ParamMap) => 
    {
      if(paramMap.has('crewId')) 
      {
        this.crewId = paramMap.get('crewId');
        this.isLoading = true;
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
<<<<<<< HEAD

        this.crewsService.getCrewMembers(this.crewId);
        this.crewMembersSub = this.crewsService.getCrewMembersUpdateListener()
          .subscribe((crewMemberData: {crewMembers: User[], crewMemberCount: number}) => {
              this.totalCrewMembers = crewMemberData.crewMemberCount;
              this.crewMembers = crewMemberData.crewMembers;
              console.log(this.crewMembers);
    
          if(this.profileService.userCrews)
          {
            this.profileService.userCrews.forEach(item => {
              if(this.crewId === item.id)
              {
                this.isMember = true;
              }
            });
          }
        });
        
=======
>>>>>>> d2b6a0295e5e939b34e4f36963342e51c9bade08
      }else
      {
        this.crewId = null;
      }
    });

<<<<<<< HEAD
    this.profileId = localStorage.getItem("profileId");
    console.log("profileId" + this.profileId);

=======
>>>>>>> d2b6a0295e5e939b34e4f36963342e51c9bade08
    this.userId = this.authService.getUserId();
    this.userIsAuthenticated = this.authService.getIsAuth();
    console.log(this.userIsAuthenticated);
    this.authStatusSub = this.authService.getAuthStatusListener()
        .subscribe(isAuthenticated => {
          this.userIsAuthenticated = isAuthenticated;
          this.userId = this.authService.getUserId();
        });
<<<<<<< HEAD
    

    this.eventsService.getEvents(this.eventsPerPage, this.currentPage, this.crewId);
        this.eventsSub = this.eventsService.getEventUpdateListener()
          .subscribe((eventData: {events: EventActivity[], eventCount: number}) => {
            this.isLoading = false;
            this.totalEvents = eventData.eventCount;
            this.events = eventData.events;
          });
=======
>>>>>>> d2b6a0295e5e939b34e4f36963342e51c9bade08
  }

  onDelete(crewId: string) 
  {
    this.isLoading = true;
    this.crewsService.deleteCrew(crewId);
  }

<<<<<<< HEAD
  onLeave(crewId: string)
  {
    this.isLoading = true;
    this.crewsService.leaveCrew(crewId, this.profileId);
  }

  onJoin(crewId: string)
  {
    this.isLoading = true;
    this.crewsService.joinCrew(crewId, this.profileId);
  }
  
=======
>>>>>>> d2b6a0295e5e939b34e4f36963342e51c9bade08
  ngOnDestroy()
  {
    this.authStatusSub.unsubscribe();
  }
}
