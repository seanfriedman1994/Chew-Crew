import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Dish } from '../../../shared/dish.model';
import { DishesService } from '../dishes.service';
import { PageEvent } from '@angular/material';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent implements OnInit, OnDestroy {

  dishes: Dish[] = [];
  isLoading = false;
  totalDishes = 0;
  dishesPerPage = 2;
  pageSizeOptions = [1,2,5,10];
  currentPage = 1;
  userIsAuthenticated = false;
  private dishesSub: Subscription;
  private authStatusSub: Subscription;

  constructor(public dishesService: DishesService, private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.dishesService.getDishes(this.dishesPerPage, this.currentPage);
    this.dishesSub = this.dishesService.getDishUpdateListener()
    .subscribe((dishData: {dishes: Dish[], dishCount: number}) => {
        this.isLoading = false;
        this.totalDishes = dishData.dishCount;
        this.dishes = dishData.dishes;
        });
      this.userIsAuthenticated = this.authService.getIsAuth();
      this.authStatusSub = this.authService.getAuthStatusListener()
        .subscribe(isAuthenticated => {
          this.userIsAuthenticated = isAuthenticated;
        });
  }

  onChangedPage(pageData: PageEvent)
  {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.dishesPerPage = pageData.pageSize;
    this.dishesService.getDishes(this.dishesPerPage, this.currentPage);
  }

  onDelete(dishId: string) {
    this.isLoading = true;
    this.dishesService.deleteDish(dishId).subscribe(() => {
      this.dishesService.getDishes(this.dishesPerPage, this.currentPage);
    });
  }

  ngOnDestroy() 
  {
    this.dishesSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
