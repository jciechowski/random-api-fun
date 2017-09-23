import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UrbanDictionaryService } from './urban-dictionary.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_CONFIG } from "./app-config";
import { CONFIG } from './app-config';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NgbModule.forRoot(),
        HttpClientModule
      ],
      declarations: [
        AppComponent,
        NavbarComponent
      ],
      providers: [
        UrbanDictionaryService,
        HttpClient,
        {provide: APP_CONFIG, useValue: CONFIG}
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
