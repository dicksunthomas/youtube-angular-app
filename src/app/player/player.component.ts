import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from '../data.service';

@Component({
  selector: 'app-track',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.less']
})
export class TrackComponent implements OnInit {
  message :string;
  private _id: string;
  constructor(private _route: ActivatedRoute, private _router: Router, private sanitizer: DomSanitizer, private data : DataService) {
    this._route.queryParamMap.subscribe(params => {
      this._id = params.get('id');
      console.log(this._id)
    })
  }
  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message)
    console.log(this.message);
  }
  getUrl(){
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+this._id)
  }
}