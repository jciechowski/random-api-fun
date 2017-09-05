import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';


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
      res['list'].map((list) => list.definition));
  }
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [UrbanDictionaryService]
})
export class NavbarComponent implements OnInit {
  constructor(private urbanDictionaryService: UrbanDictionaryService) {

  }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .switchMap(term => {
        return this.urbanDictionaryService.search(term);
      })

  ngOnInit() {

  }
}
