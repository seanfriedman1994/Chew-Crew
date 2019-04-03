import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Crew } from '../../models/interface-models';
import { CrewsService } from '../crews.service';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from '../../models/interface-models';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EventActivity } from '../../models/interface-models';


@Component({
  selector: 'app-crew-page',
  templateUrl: './crew-page.component.html',
  styleUrls: ['./crew-page.component.css']
})
export class CrewPageComponent implements OnInit, OnDestroy{

  crewMembers: User[] = [];
  events: EventActivity[] = [];
  isLoading = false;
  userIsAuthenticated = false;
  userId: string;
  crew: Crew;
  private crewsSub: Subscription;
  private authStatusSub: Subscription;
  private crewId: string;

  constructor(public crewsService: CrewsService, private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit() 
  {

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
  }

  onDelete(crewId: string) 
  {
    this.isLoading = true;
    this.crewsService.deleteCrew(crewId);
  }

  ngOnDestroy()
  {
    this.authStatusSub.unsubscribe();
  }
}
