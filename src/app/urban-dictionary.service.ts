import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_CONFIG } from './app-config';

interface Definition {
  definition: string;
  permalink: string;
  thumbs_up: number;
  thumbs_down: number;
}

interface DefinitionResponse {
  list: Definition[];
}

@Injectable()
export class UrbanDictionaryService {
  private headerObj: any;
  private ApiUrl: string;
  private ApiKey: string;

  constructor(@Inject(APP_CONFIG) config, private http: HttpClient) {
    this.ApiUrl = config.ApiEndpoint;
    this.ApiKey = config.ApiKey;
    this.headerObj = this.prepareHeaders();
  }

  search(term: string): any {
    if (term === '') {
      return Observable.of([]);
    }
    const url = `${this.ApiUrl}${term}`;
    return this.http.get<DefinitionResponse>(url, this.headerObj).map(res => {
        console.log(res['list']);
        return res['list'].map((list) => list.definition)
      }
    );
  }

  private prepareHeaders() {
    const headerDict = {
      'X-Mashape-Authorization': this.ApiKey,
      'Accept': 'text/plain',
      'Access-Control-Allow-Headers': 'Content-Type'
    };
    return {
      headers: new HttpHeaders(headerDict),
    };
  }

}
