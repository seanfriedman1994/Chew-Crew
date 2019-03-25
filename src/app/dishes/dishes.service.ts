import { Dish } from '../../shared/dish.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DishesService {
    private dishes: Dish[] = [];
    private dishesUpdated = new Subject<Dish[]>();

    constructor(private http: HttpClient){}

    getDishes() 
    {
        this.http
        .get<{message: string; dishes: any}>(
            "http://localhost:3000/api/dishes"
        )
        .pipe(map((dishData) => {
            return dishData.dishes.map(dish => {
                return {
                    name: dish.name,
                    description: dish.description,
                    tags: dish.tags,
                    imagePath: dish.imagePath,
                    id: dish._id
                };
            });
        }))
        .subscribe(transformedDishes => {
            this.dishes = transformedDishes;
            this.dishesUpdated.next([...this.dishes]);
        });
    }

    getDishUpdateListener()
    {
        return this.dishesUpdated.asObservable();
    }

    addDish(name: string, description: string, imagePath: string, tags: string) 
    {
        const dish: Dish = {
            id: null, 
            name: name, 
            description: description, 
            imagePath: imagePath, 
            tags: tags
        };
        this.http.post<{message: string, dishId: string}>("http://localhost:3000/api/dishes", dish)
        .subscribe((responseData) => {
            const id = responseData.dishId;
            dish.id = id;
            this.dishes.push(dish);
            this.dishesUpdated.next([...this.dishes]);
        });
    }

    deleteDish(dishId: string) {
        this.http.delete("http://localhost:3000/api/dishes/" + dishId)
        .subscribe(() => {
            const updatedDishes = this.dishes.filter(dish => dish.id !== dishId);
            this.dishes = updatedDishes;
            this.dishesUpdated.next([...this.dishes]);
        });
    }
}