import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { DishesService } from '../dishes.service';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { Dish } from '../../models/dish.model';
import { mimeType } from '../../auth/mime-type.validator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';

export interface Tag {
  name: string;
}

@Component({
  selector: 'app-dish-create',
  templateUrl: './dish-create.component.html',
  styleUrls: ['./dish-create.component.css']
})

export class DishCreateComponent implements OnInit, OnDestroy{
  enteredName = "";
  enteredDescription = "";
  enteredTags = "";
  dish: Dish;
  private mode = 'create';
  private dishId: string;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private authStatusSub: Subscription;
  eventId: string;
  
  constructor(public dishesService: DishesService, public route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit()
  {
    
    this.authStatusSub = this.authService.getAuthStatusListener()
    .subscribe(getAuthStatus => {
      this.isLoading = false;
    });
    this.form = new FormGroup({
      'name': new FormControl(null, {
        validators: [Validators.required]
      }),
      'description': new FormControl(null, {
        validators: [Validators.required]
      }),
      'tags': new FormControl(null, {
        validators: [Validators.required]
      }),
      'image': new FormControl(null, {
        //validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
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
            imagePath: dishData.imagePath,
            creator: dishData.creator,
            eventId: dishData.eventId
          };
          this.form.setValue({
            'name': this.dish.name,
            'description': this.dish.description,
            'tags': this.dish.tags,
            'image': this.dish.imagePath
          });
          this.imagePreview = this.dish.imagePath;
        });
      }else
      {
        this.mode = 'create';
        this.dishId = null;
      }
    });
  }

  onImagePicked(event: Event)
  {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = <string>reader.result;
    };
    reader.readAsDataURL(file);
  }

  onSaveDish()
  {
    if(this.form.invalid)
    {
      return;
    }
    this.isLoading = true;
     this.eventId = localStorage.getItem("eventId");
      console.log("event Id is " + this.eventId);
    if(this.mode === 'create')
    {

      this.dishesService.addDish(
        this.form.value.name,
        this.form.value.description,
        this.form.value.tags,
        this.form.value.image,
        this.eventId);
    }else
    {
      this.dishesService.updateDish(
        this.dishId,
        this.form.value.name,
        this.form.value.description,
        this.form.value.tags,
        this.form.value.image,
        this.eventId
        );
    }
    this.form.reset();
  }

  ngOnDestroy()
  {
    this.authStatusSub.unsubscribe();
  }

}
