import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { UrbanDictionaryService } from '../urban-dictionary.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_CONFIG } from "../app-config";
import { CONFIG } from '../app-config';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NgbModule.forRoot(),
        HttpClientModule
      ],
      declarations: [NavbarComponent],
      providers: [
        UrbanDictionaryService,
        HttpClient,
        {provide: APP_CONFIG, useValue: CONFIG}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
