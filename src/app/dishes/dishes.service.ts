import { Dish } from '../models/dish.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from "../../environments/environment";

const BACKEND_URL = environment.apiUrl + "/dishes/";

@Injectable({providedIn: 'root'})
export class DishesService {
    private dishes: Dish[] = [];
<<<<<<< HEAD
    private eventDishes: Dish[] = [];
    private eventDishesUpdated = new Subject<{eventDishes: Dish[], eventDishCount: number}>();
=======
>>>>>>> d2b6a0295e5e939b34e4f36963342e51c9bade08
    private dishesUpdated = new Subject<{dishes: Dish[], dishCount: number}>();

    constructor(private http: HttpClient, private router: Router){}

    getDishes(dishesPerPage: number, currentPage: number) 
    {
        const queryParams = `?pageSize=${dishesPerPage}&page=${currentPage}`;
        this.http
        .get<{message: string; dishes: any, maxDishes: number}>(
            BACKEND_URL + queryParams
        )
        .pipe(map((dishData) => {
            return { 
                dishes: dishData.dishes.map(dish => {
                return {
                    name: dish.name,
                    description: dish.description,
                    tags: dish.tags,
                    id: dish._id,
                    imagePath: dish.imagePath,
<<<<<<< HEAD
                    creator: dish.creator,
                    eventId: dish.eventId
=======
                    creator: dish.creator
>>>>>>> d2b6a0295e5e939b34e4f36963342e51c9bade08
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

<<<<<<< HEAD
    getEventDishes(dishesPerPage: number, currentPage: number, eventId: string) 
    {
        const queryParams = `?pageSize=${dishesPerPage}&page=${currentPage}&eventId=${eventId}`;
        this.http
        .get<{message: string; dishes: any, maxDishes: number}>(
            BACKEND_URL + queryParams
        )
        .pipe(map((dishData) => {
            return { 
                dishes: dishData.dishes.map(dish => {
                return {
                    name: dish.name,
                    description: dish.description,
                    tags: dish.tags,
                    id: dish._id,
                    imagePath: dish.imagePath,
                    creator: dish.creator,
                    eventId: dish.eventId
                };
            }), 
            maxDishes: dishData.maxDishes
        };
        }))
        .subscribe(transformedDishData => {
            this.eventDishes = transformedDishData.dishes;
            this.eventDishesUpdated.next({
                eventDishes: [...this.eventDishes], eventDishCount: transformedDishData.maxDishes
            });
        });
    }

=======
>>>>>>> d2b6a0295e5e939b34e4f36963342e51c9bade08
    getDishUpdateListener()
    {
        return this.dishesUpdated.asObservable();
    }

<<<<<<< HEAD
    getEventDishUpdateListener()
    {
        return this.eventDishesUpdated.asObservable();
    }

=======
>>>>>>> d2b6a0295e5e939b34e4f36963342e51c9bade08
    getDish(id: string) 
    {

        return this.http.get<{
            _id: string; 
            name: string; 
            description: string; 
            tags: string; 
            imagePath: string;
            creator: string;
<<<<<<< HEAD
            eventId: string;
        }>(BACKEND_URL + id);
    }

    addDish(name: string, description: string, tags: string, image: File, eventId: string) 
=======
        }>(BACKEND_URL + id);
    }

    addDish(name: string, description: string, tags: string, image: File) 
>>>>>>> d2b6a0295e5e939b34e4f36963342e51c9bade08
    {
        const dishData = new FormData();
        dishData.append("name", name);
        dishData.append("description", description);
        dishData.append("tags", tags);
        dishData.append("image", image, name);
<<<<<<< HEAD
        dishData.append("eventId", eventId);


=======
>>>>>>> d2b6a0295e5e939b34e4f36963342e51c9bade08

        this.http.post<{message: string, dish: Dish}>(BACKEND_URL, dishData)
        .subscribe((responseData) => {
            this.router.navigate(["/events/" + eventId]);
        });
    }

    updateDish(id: string, name: string, description: string, tags: string, image: File | string, eventId: string){
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
                imagePath: image,
<<<<<<< HEAD
                creator: null,
                eventId: eventId
=======
                creator: null
>>>>>>> d2b6a0295e5e939b34e4f36963342e51c9bade08
            };
        }
        this.http.put(BACKEND_URL + id, dishData)
        .subscribe(response => {
            this.router.navigate(["/events/" + eventId]);
        });

    }

    deleteDish(dishId: string) {
        return this.http.delete(BACKEND_URL + dishId);
    }
}