import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneDayWeatherComponent } from './one-day-weather.component';

describe('OneDayWeatherComponent', () => {
  let component: OneDayWeatherComponent;
  let fixture: ComponentFixture<OneDayWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneDayWeatherComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneDayWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
