import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrewCreateComponent } from './crew-create.component';

describe('CrewCreateComponent', () => {
  let component: CrewCreateComponent;
  let fixture: ComponentFixture<CrewCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrewCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrewCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
