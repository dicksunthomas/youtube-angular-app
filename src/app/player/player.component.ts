import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { YoutubeService } from '../youtube.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-track',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.less']
})
export class TrackComponent implements OnInit {
  message: string;
  token;
  videos: any;
  private _id: string;
  private unsubscribe$: Subject<any> = new Subject();
  constructor(private _route: ActivatedRoute, private _router: Router, private sanitizer: DomSanitizer, private data: DataService,private youTubeService: YoutubeService) {
   
  }
  ngOnInit() {
    this.videos = [];
    this.message = this.data.getData();
    console.log(this.message);
    this._route.queryParamMap.subscribe(params => {
      this._id = params.get('id');      
    })
    let videoApi = this.youTubeService.getVideoById(this._id);
    console.log("1"+this._id);
    // videoApi.subscribe(res => {
    //   this.token = res;
    // });
    videoApi
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(lista => {
        for (let element of lista["items"]) {
          console.log("2"+element.id)
          this.videos.push(element)
          console.log("3"+element.id)
        }
      });
  }
  getUrl(){
    return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+this._id)
  }
}