import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG } from './app-config';

@Injectable()
export class UrbanDictionaryService {
  private headerObj: any;
  private ApiUrl: string;

  constructor(@Inject(APP_CONFIG) config, private http: HttpClient) {
    this.ApiUrl = config.ApiEndpoint;
    this.headerObj = UrbanDictionaryService.prepareHeaders();
  }

  private static prepareHeaders() {
    const headerDict = {
      'X-Mashape-Authorization': 'QwXbIDZpMjmshn9njwGtM2LJrhPJp1vzY84jsnbSVrXtBkW3MR',
      'Accept': 'text/plain',
      'Access-Control-Allow-Headers': 'Content-Type'
    };
    return {
      headers: new HttpHeaders(headerDict),
    };
  }

  search(term: string): any {
    if (term === '') {
      return Observable.of([]);
    }
    const url = `${this.ApiUrl}${term}`;
    return this.http.get(url, this.headerObj).map(res =>
      res['list'].map((list) => list.definition)
    );
  }

}
