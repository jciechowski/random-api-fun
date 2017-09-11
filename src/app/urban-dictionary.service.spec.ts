import { TestBed } from '@angular/core/testing';

import { UrbanDictionaryService } from './urban-dictionary.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('UrbanDictionaryService', () => {
  let service: UrbanDictionaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        UrbanDictionaryService,
        HttpClient
      ]
    });
    service = TestBed.get(UrbanDictionaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return correct value if term is empty', () => {
    const response = service.search('');
    expect(response).toEqual(Observable.of([]));
  });

  it('should return correct value for correct term', () => {
    const http = TestBed.get(HttpTestingController);
    const fakeResponse = {list: [{definition: '1'}, {definition: '2'}]};

    let result;
    service.search('dummySearch').subscribe(data => {
      result = data;
    });

    http.expectOne('https://mashape-community-urban-dictionary.p.mashape.com/define?term=dummySearch').flush(fakeResponse);
  });
});
