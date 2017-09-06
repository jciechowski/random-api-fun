import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { UrbanDictionaryService } from '../urban-dictionary.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
        HttpClient
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
