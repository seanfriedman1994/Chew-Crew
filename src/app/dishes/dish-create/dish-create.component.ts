import { Component, OnInit} from '@angular/core';
import { NgForm } from "@angular/forms";
import { DishesService } from '../dishes.service';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { Dish } from 'src/shared/dish.model';



@Component({
  selector: 'app-dish-create',
  templateUrl: './dish-create.component.html',
  styleUrls: ['./dish-create.component.css']
})
export class DishCreateComponent implements OnInit{
  enteredName = "";
  enteredDescription = "";
  enteredImagePath = "";
  enteredTags = "";
  dish: Dish;
  private mode = 'create';
  private dishId: string;
  isLoading = false;
  
constructor(public dishesService: DishesService, public route: ActivatedRoute) {}

  ngOnInit() 
  {
    this.route.paramMap.subscribe((paramMap: ParamMap) => 
    {
      if(paramMap.has('dishId')) 
      {
        this.mode = 'edit';
        this.dishId = paramMap.get('dishId');
        this.isLoading = true;
        this.dishesService.getDish(this.dishId).subscribe(dishData => {
          this.isLoading = false;
          this.dish = 
          {
            id: dishData._id, 
            name: dishData.name, 
            description: dishData.description,
            tags: dishData.tags,
            imagePath: dishData.imagePath
          };
        });
      }else
      {
        this.mode = 'create';
        this.dishId = null;
      }
    });
  }

  onSaveDish(form: NgForm)
  {
    if(form.invalid)
    {
      return;
    }
    this.isLoading = true;
    if(this.mode === 'create')
    {
      this.dishesService.addDish(
        form.value.name, 
        form.value.description, 
        form.value.imagePath, 
        form.value.tags);
    }else
    {
      this.dishesService.updateDish(
        this.dishId, 
        form.value.name, 
        form.value.description, 
        form.value.imagePath, 
        form.value.tags)
    }

    form.resetForm();
  }
}
