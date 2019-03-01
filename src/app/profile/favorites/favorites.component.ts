import { Component, OnInit } from '@angular/core';

import { Dish } from '../../../shared/dish.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  dishes: Dish[] = [
    new Dish(
      'A Test Dish', 
      'Description test', 
      'https://c.pxhere.com/photos/33/ed/food_burger_sandwich_bacon_dinner-44324.jpg!d')

  ];

  constructor() {
    
  }

  ngOnInit() {
  }

}
