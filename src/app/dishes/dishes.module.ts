import { NgModule } from '@angular/core';
import { DishListComponent } from './dish-list/dish-list.component';
import { DishCreateComponent } from './dish-create/dish-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DishesComponent } from './dishes.component';
import { AngularMaterialModule } from '../angular-material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: 
    [
        DishListComponent,
        DishCreateComponent,
        DishesComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AngularMaterialModule,
        RouterModule
    ]
})
export class DishesModule {}