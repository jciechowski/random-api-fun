import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { UrbanDictionaryService } from '../urban-dictionary.service';
import 'rxjs/add/operator/do';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public model: any;
  loading: any;
  constructor(private urbanDictionaryService: UrbanDictionaryService) {

  }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .do(() => this.loading = true)
      .switchMap(term => {
        return this.urbanDictionaryService.search(term);
      }).do(() => this.loading = false)

  ngOnInit() {
  }
}
