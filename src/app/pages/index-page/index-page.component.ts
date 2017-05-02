import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit {

  constructor(private _pageTitle: Title) { }

  ngOnInit() {
    this._pageTitle.setTitle('Hallo Greentube');
  }

}
