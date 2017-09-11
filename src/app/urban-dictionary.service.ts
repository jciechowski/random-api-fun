import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UrbanDictionaryService {
  private headerObj: any;

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

  constructor(private http: HttpClient) {
    this.headerObj = UrbanDictionaryService.prepareHeaders();
  }

  search(term: string): any {
    if (term === '') {
      return Observable.of([]);
    }
    const url = 'https://mashape-community-urban-dictionary.p.mashape.com/define?term=' + term;
    return this.http.get(url, this.headerObj).map(res =>
      res['list'].map((list) => list.definition)
    );
  }

}
