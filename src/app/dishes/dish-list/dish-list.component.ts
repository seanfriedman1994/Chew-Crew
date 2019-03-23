import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Dish } from '../../../shared/dish.model';
import { DishesService } from '../dishes.service';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent implements OnInit, OnDestroy {
  dishes: Dish[] = [
    // new Dish(
    // 'A Test Dish', 
    // 'Description test', 
    // 'https://c.pxhere.com/photos/33/ed/food_burger_sandwich_bacon_dinner-44324.jpg!d'), 
    // new Dish(
    //   'A Test Dish', 
    //   'Description test', 
    //   'https://c.pxhere.com/photos/33/ed/food_burger_sandwich_bacon_dinner-44324.jpg!d')
  
  ];

  private dishesSub: Subscription;

  constructor(public dishesService: DishesService) { }

  ngOnInit() {
    this.dishes = this.dishesService.getDishes();
    this.dishesSub = this.dishesService.getDishUpdateListener().subscribe(
      (dishes: Dish[]) => 
        {
          this.dishes = dishes;
        }
      );
  }

  ngOnDestroy() {
    this.dishesSub.unsubscribe();
  }

}
