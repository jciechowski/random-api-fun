import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UrbanDictionaryService } from './urban-dictionary.service';
import { APP_CONFIG, CONFIG } from './app-config';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpClientModule
  ],
  providers: [
    UrbanDictionaryService,
    {provide: APP_CONFIG, useValue: CONFIG}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
