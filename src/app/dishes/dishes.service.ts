import { Dish } from '../../shared/dish.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class DishesService {
    private dishes: Dish[] = [];
    private dishesUpdated = new Subject<{dishes: Dish[], dishCount: number}>();

    constructor(private http: HttpClient, private router: Router){}

    getDishes(dishesPerPage: number, currentPage: number) 
    {
        const queryParams = `?pageSize=${dishesPerPage}&page=${currentPage}`;
        this.http
        .get<{message: string; dishes: any, maxDishes: number}>(
            "http://localhost:3000/api/dishes" + queryParams
        )
        .pipe(map((dishData) => {
            return { 
                dishes: dishData.dishes.map(dish => {
                return {
                    name: dish.name,
                    description: dish.description,
                    tags: dish.tags,
                    id: dish._id,
                    imagePath: dish.imagePath
                };
            }), 
            maxDishes: dishData.maxDishes
        };
        }))
        .subscribe(transformedDishData => {
            this.dishes = transformedDishData.dishes;
            this.dishesUpdated.next({
                dishes: [...this.dishes], dishCount: transformedDishData.maxDishes
            });
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
            this.router.navigate(["/"]);
        });

    }

    deleteDish(dishId: string) {
        return this.http.delete("http://localhost:3000/api/dishes/" + dishId);
    }
}