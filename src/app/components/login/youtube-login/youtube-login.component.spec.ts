import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeLoginComponent } from './youtube-login.component';

describe('YoutubeLoginComponent', () => {
  let component: YoutubeLoginComponent;
  let fixture: ComponentFixture<YoutubeLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YoutubeLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubeLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
