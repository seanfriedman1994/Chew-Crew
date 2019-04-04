import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Crew } from '../../models/interface-models';
import { CrewsService } from '../crews.service';
import { PageEvent } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from '../../models/interface-models';

@Component({
  selector: 'app-crew-list',
  templateUrl: './crew-list.component.html',
  styleUrls: ['./crew-list.component.css']
})
export class CrewListComponent implements OnInit, OnDestroy {

  crews: Crew[] = [];
  crewMembers: User[] = [];
  isLoading = false;
  totalCrews = 0;
  crewsPerPage = 3;
  pageSizeOptions = [1,3,5,10];
  currentPage = 1;
  userIsAuthenticated = false;
  userId: string;
  private crewsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(public crewsService: CrewsService, private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.crewsService.getCrews(this.crewsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.crewsSub = this.crewsService.getCrewUpdateListener()
    .subscribe((crewData: {crews: Crew[], crewCount: number}) => {
        this.isLoading = false;
        this.totalCrews = crewData.crewCount;
        this.crews = crewData.crews;
    });
      this.userIsAuthenticated = this.authService.getIsAuth();
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
    this.crewsPerPage = pageData.pageSize;
    this.crewsService.getCrews(this.crewsPerPage, this.currentPage);
  }

  ngOnDestroy() 
  {
    this.crewsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
