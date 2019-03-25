import { Dish } from '../../shared/dish.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DishDetailComponent } from './dish-detail/dish-detail.component';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class DishesService {
    private dishes: Dish[] = [];
    private dishesUpdated = new Subject<Dish[]>();

    constructor(private http: HttpClient, private router: Router){}

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

    getDish(id: string) 
    {
        return this.http.get<{_id: string, name: string, description: string, tags: string, imagePath: string}>("http://localhost:3000/api/dishes/" + id);
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
            this.router.navigate(["/"]);
        });
    }

    updateDish(id: string, name: string, description: string, imagePath: string, tags: string){
        const dish: Dish = {
            id: id,
            name: name,
            description: description,
            tags: tags,
            imagePath: imagePath
        };
        this.http.put("http://localhost:3000/api/dishes/" + id, dish)
        .subscribe(response => {
            const updatedDishes = [...this.dishes];
            const oldDishIndex = updatedDishes.findIndex(d => d.id === dish.id);
            updatedDishes[oldDishIndex] = dish;
            this.dishes = updatedDishes;
            this.dishesUpdated.next([...this.dishes]);
            this.router.navigate(["/"]);
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