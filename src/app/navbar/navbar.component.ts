import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  public model: any;
  private url: string;
  private headerObj: any;
  private data: any;

  private static prepareHeaders() {
    const headerDict = {
      'X-Mashape-Authorization': 'QwXbIDZpMjmshn9njwGtM2LJrhPJp1vzY84jsnbSVrXtBkW3MR',
      'Accept': 'text/plain',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    return {
      headers: new HttpHeaders(headerDict),
    };
  }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .switchMap(term => {
        this.doSearch(term);
        console.log(this.data);
        return this.data;
      })

  constructor(private http: HttpClient) {

  }

  ngOnInit() {

  }

  private doSearch(term: string) {
    this.headerObj = NavbarComponent.prepareHeaders();
    this.url = 'https://mashape-community-urban-dictionary.p.mashape.com/define?term=' + term;
    this.http
      .get(this.url, this.headerObj)
      .subscribe((data: any) => {
        this.data = Observable.of(data.list);
      });
  }
}
