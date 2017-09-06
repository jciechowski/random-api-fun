import { inject, TestBed } from '@angular/core/testing';

import { UrbanDictionaryService } from './urban-dictionary.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ConnectionBackend, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('UrbanDictionaryService', () => {
  let service: UrbanDictionaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        UrbanDictionaryService,
        HttpClient,
        {provide: XHRBackend, useClass: MockBackend},
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

  it('should return correct value for correct term', (inject([XHRBackend], (backendMock) => {
    backendMock.connections.subscribe((connection) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: {list: [{definition: '1'}, {definition: '2'}]}
      })));
    });
    let result;
    service.search('dummySearch').subscribe(data => {
      console.log(data)
      result = data;
    });
    expect(result.definition).toEqual(2);
  })));
});
