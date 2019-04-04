import { EventActivity } from '../../models/interface-models';
import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { EventsService } from '../events.service';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {
  enteredName = "";
  enteredDescription = "";
  event: EventActivity;
  private mode = 'create';
  private eventId: string;
  private crewId: string;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private authStatusSub: Subscription;
  public selectedTime: string;
  
  constructor(public eventsService: EventsService, public route: ActivatedRoute, private authService: AuthService) {}

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
      'date': new FormControl(null, {
        validators: [Validators.required]
      }),
      'location': new FormControl(null, {
        validators: [Validators.required]
      }),
      'description': new FormControl(null, {
        validators: [Validators.required]
      })
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => 
    {
      if(paramMap.has('eventId')) 
      {
        this.mode = 'edit';
        this.eventId = paramMap.get('eventId');
        this.isLoading = true;
        this.eventsService.getEvent(this.eventId).subscribe(eventData => { 
          this.isLoading = false;
          this.event = 
          {
            id: eventData._id, 
            name: eventData.name,
            date: eventData.date,
            location: eventData.location,
            description: eventData.description,
            creator: eventData.creator,
            crewId: eventData.crewId
          };
          this.form.setValue({
            'name': this.event.name,
            'date' : this.event.date,
            'location' : this.event.location,
            'description': this.event.description,
          });
        });
      }else
      {
        this.crewId = localStorage.getItem("crewId");
        this.mode = 'create';
        this.eventId = null;
      }
    });
  }

  onSaveEvent()
  {
    if(this.form.invalid)
    {
      return;
    }
    this.isLoading = true;
    if(this.mode === 'create')
    {
      console.log("create mode");
      console.log(this.form.value.name);
      console.log(this.form.value.date);

      this.eventsService.addEvent(
        this.form.value.name,
        this.form.value.date,
        this.form.value.location,
        this.form.value.description,
        this.crewId
        );
    }else
    {
      this.eventsService.updateEvent(
        this.eventId, 
        this.form.value.name, 
        this.form.value.date,
        this.form.value.location,
        this.form.value.description
        );
    }
    this.form.reset();
  }

  ngOnDestroy() 
  {
    this.authStatusSub.unsubscribe();
  }
}

