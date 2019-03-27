import { Dish } from '../../shared/dish.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
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
                    id: dish._id,
                    imagePath: dish.imagePath
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
        return this.http.get<{_id: string, name: string, description: string, tags: string, imagePath: string}
        >("http://localhost:3000/api/dishes/" + id);
    }

    addDish(name: string, description: string, tags: string, image: File) 
    {
        const dishData = new FormData();
        dishData.append("name", name);
        dishData.append("description", description);
        dishData.append("tags", tags);
        dishData.append("image", image, name);

        this.http.post<{message: string, dish: Dish}>("http://localhost:3000/api/dishes", dishData)
        .subscribe((responseData) => {
            const dish: Dish = {
                id: responseData.dish.id, 
                name: name, 
                description: description,
                tags: tags,
                imagePath: responseData.dish.imagePath
            };
            this.dishes.push(dish);
            this.dishesUpdated.next([...this.dishes]);
            this.router.navigate(["/"]);
        });
    }

    updateDish(id: string, name: string, description: string, tags: string, image: File | string){
        let dishData: Dish | FormData;
        if(typeof(image) === 'object')
        {
            dishData = new FormData();
            dishData.append("id", id);
            dishData.append("name", name);
            dishData.append("description", description);
            dishData.append("tags", tags);
            dishData.append("image", image, name);

        }
        else
        {
            dishData = {
                id: id,
                name: name,
                description,
                tags: tags,
                imagePath: image
            };
        }
        this.http.put("http://localhost:3000/api/dishes/" + id, dishData)
        .subscribe(response => {
            const updatedDishes = [...this.dishes];
            const oldDishIndex = updatedDishes.findIndex(d => d.id === id);
            const dish: Dish = {
                id: id,
                name: name,
                description,
                tags: tags,
                imagePath: ""
            };
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