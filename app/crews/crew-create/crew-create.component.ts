import { Crew } from '../../models/interface-models';
import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CrewsService } from '../crews.service';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { mimeType } from '../../auth/mime-type.validator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-crew-create',
  templateUrl: './crew-create.component.html',
  styleUrls: ['./crew-create.component.css']
})
export class CrewCreateComponent implements OnInit {
  enteredName = "";
  enteredDescription = "";
  crew: Crew;
  private mode = 'create';
  private crewId: string;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private authStatusSub: Subscription;
  
  constructor(public crewsService: CrewsService, public route: ActivatedRoute, private authService: AuthService) {}

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
      'image': new FormControl(null, {
        //validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => 
    {
      if(paramMap.has('crewId')) 
      {
        this.mode = 'edit';
        this.crewId = paramMap.get('crewId');
        this.isLoading = true;
        this.crewsService.getCrew(this.crewId).subscribe(crewData => { 
          this.isLoading = false;
          this.crew = 
          {
            id: crewData._id, 
            name: crewData.name, 
            description: crewData.description,
            image: crewData.image,
            creator: crewData.creator
          };
          this.form.setValue({
            'name': this.crew.name,
            'description': this.crew.description,
            'image': this.crew.image
          });
          this.imagePreview = this.crew.image;
        });
      }else
      {
        this.mode = 'create';
        this.crewId = null;
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

  onSaveCrew()
  {
    if(this.form.invalid)
    {
      return;
    }
    this.isLoading = true;
    if(this.mode === 'create')
    {
      this.crewsService.addCrew(
        this.form.value.name, 
        this.form.value.description,
        this.form.value.image);
    }else
    {
      this.crewsService.updateCrew(
        this.crewId, 
        this.form.value.name, 
        this.form.value.description,
        this.form.value.image
        );
    }
    this.form.reset();
  }

  ngOnDestroy() 
  {
    this.authStatusSub.unsubscribe();
  }
}

