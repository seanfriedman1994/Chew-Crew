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
    private favoriteDishes: Dish[] = [];
    private eventDishes: Dish[] = [];
    private favoriteDishesUpdated = new Subject<{favoriteDishes: Dish[], favoriteDishCount: number}>();
    private eventDishesUpdated = new Subject<{eventDishes: Dish[], eventDishCount: number}>();
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
                    creator: dish.creator,
                    eventId: dish.eventId
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

    getFavoriteDishes(profileId: string, dishesPerPage: number, currentPage: number){
        const queryParams = `?pageSize=${dishesPerPage}&page=${currentPage}&profileId=${profileId}`;
        this.http
        .get<{message: string; dishes: any, maxDishes: number}>(
            BACKEND_URL + queryParams
        )
        .pipe(map((dishData) => {
            return { 
                dish: dishData.dishes.map(dish => {
                return {
                    id: dish._id,
                    name: dish.name,
                    description: dish.description,
                    tags: dish.tags,
                    image: dish.image,
                    creator: dish.creator,
                    eventId: dish.eventId
                };
            }), 
            maxDishes: dishData.maxDishes
        };
        }))
        .subscribe(transformedDishData => {
            this.favoriteDishes = transformedDishData.dish;
            this.favoriteDishesUpdated.next({
                favoriteDishes: [...this.favoriteDishes], favoriteDishCount: transformedDishData.maxDishes
            });
        });
    }

    getDishUpdateListener()
    {
        return this.dishesUpdated.asObservable();
    }

    getEventDishUpdateListener()
    {
        return this.eventDishesUpdated.asObservable();
    }

    getDish(id: string) 
    {

        return this.http.get<{
            _id: string; 
            name: string; 
            description: string; 
            tags: string; 
            imagePath: string;
            creator: string;
            eventId: string;
        }>(BACKEND_URL + id);
    }

    addDish(name: string, description: string, tags: string, image: File, eventId: string) 
    {
        const dishData = new FormData();
        dishData.append("name", name);
        dishData.append("description", description);
        dishData.append("tags", tags);
        dishData.append("image", image, name);
        dishData.append("eventId", eventId);



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
                creator: null,
                eventId: null
            };
        }
        this.http.put(BACKEND_URL + id, dishData)
        .subscribe(response => {
            this.router.navigate(["/events/" + eventId]);
        });

    }

    favoriteDish(dishId: string, profileId: string)
    {
        const userDishData = new FormData();
        userDishData.append("dishId", dishId);
        userDishData.append("profileId", profileId);

        return this.http.post<{message: string}>(BACKEND_URL + profileId, userDishData);
    }

    deleteDish(dishId: string) {
        return this.http.delete(BACKEND_URL + dishId);
    }
}