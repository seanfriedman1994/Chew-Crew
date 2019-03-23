import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Dish } from '../../../shared/dish.model';
import { DishesService } from '../dishes.service';


@Component({
  selector: 'app-dish-create',
  templateUrl: './dish-create.component.html',
  styleUrls: ['./dish-create.component.css']
})
export class DishCreateComponent {
  enteredName = "";
  enteredDescription = "";
  enteredImagePath = "";
  enteredTags = "";

constructor(public dishesService: DishesService) {}

  onAddDish(form: NgForm)
  {
    if(form.invalid)
    {
      return;
    }
    this.dishesService.addDish(
      form.value.name, 
      form.value.description, 
      form.value.imagePath, 
      form.value.tags);

    form.resetForm();
  }

}
