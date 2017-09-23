import { TestBed } from '@angular/core/testing';

import { UrbanDictionaryService } from './urban-dictionary.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { APP_CONFIG, CONFIG } from './app-config';

describe('UrbanDictionaryService', () => {
  let service: UrbanDictionaryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [
        UrbanDictionaryService,
        HttpClient,
        {provide: APP_CONFIG, useValue: CONFIG}
      ]
    });
    service = TestBed.get(UrbanDictionaryService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return correct value if term is empty', () => {
    const response = service.search('');
    expect(response).toEqual(Observable.of([]));
  });

  it('should return correct value for correct term', () => {
    const fakeResponse = {list: [{definition: '1'}, {definition: '2'}]};

    service.search('dummySearch').subscribe(result => {
      expect(result.length).toBe(2);
      expect(result).toEqual(['1', '2']);
    });

    const req = httpMock.expectOne('https://mashape-community-urban-dictionary.p.mashape.com/define?term=dummySearch');
    expect(req.request.method).toBe('GET');
    req.flush(fakeResponse);

  });
});
