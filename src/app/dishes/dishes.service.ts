import { Dish } from '../../shared/dish.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class DishesService {
    private dishes: Dish[] = [];
    private dishesUpdated = new Subject<Dish[]>();

    getDishes() 
    {
        return [...this.dishes];
    }

    getDishUpdateListener()
    {
        return this.dishesUpdated.asObservable();
    }

    addDish(name: string, description: string, imagePath: string, tags: string) 
    {
        const dish: Dish = {name: name, description: description, imagePath: imagePath, tags: tags};
        this.dishes.push(dish);
        this.dishesUpdated.next([...this.dishes]);
    }
}