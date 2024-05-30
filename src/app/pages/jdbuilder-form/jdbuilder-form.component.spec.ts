import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JDBuilderFormComponent } from './jdbuilder-form.component';

describe('JDBuilderFormComponent', () => {
  let component: JDBuilderFormComponent;
  let fixture: ComponentFixture<JDBuilderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JDBuilderFormComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JDBuilderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
