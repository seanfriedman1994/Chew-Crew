import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DishListComponent } from './dishes/dish-list/dish-list.component';
import { DishCreateComponent } from './dishes/dish-create/dish-create.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent} from './profile/profile-edit/profile-edit.component';
import { CrewListComponent } from './crews/crew-list/crew-list.component';
import { CrewCreateComponent } from './crews/crew-create/crew-create.component';
import { CrewPageComponent } from './crews/crew-page/crew-page.component';
import { EventsComponent } from './events/events.component';
import { EventCreateComponent } from './events/event-create/event-create.component';
<<<<<<< HEAD
import { EventListComponent } from './events/event-list/event-list.component';
=======
>>>>>>> e4624b39072281853e1ccac3a466139ae5c621ac
 
const routes: Routes = [
    //home page
    { path: '', component: HomeComponent },
    //profile page
    { path: 'profile/edit/:id', component: ProfileEditComponent},
    { path: 'profile', component: ProfileComponent},
    //crews page
    { path: 'crews', component: CrewListComponent },
    { path: 'crews/create', component: CrewCreateComponent, canActivate: [AuthGuard]},
    { path: 'crews/edit/:crewId', component: CrewCreateComponent, canActivate: [AuthGuard]},
    { path: 'crews/:crewId', component: CrewPageComponent, canActivate: [AuthGuard]},
    //events
    { path: 'events/create', component: EventCreateComponent, canActivate: [AuthGuard] },
    { path: 'events/:eventId', component: EventsComponent },
    { path: 'events/edit/:eventId', component: EventCreateComponent, canActivate: [AuthGuard] },
<<<<<<< HEAD
    { path: 'events', component: EventListComponent, canActivate: [AuthGuard]},
=======
>>>>>>> e4624b39072281853e1ccac3a466139ae5c621ac
    //dishes
    { path: 'dishes', component: DishListComponent },
    { path: 'dishes/create', component: DishCreateComponent, canActivate: [AuthGuard] },
    { path: 'dishes/edit/:dishId', component: DishCreateComponent, canActivate: [AuthGuard]},
    //lazy loading for auth
    { path: 'auth', loadChildren: "./auth/auth.module#AuthModule"}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})

export class AppRoutingModule {}