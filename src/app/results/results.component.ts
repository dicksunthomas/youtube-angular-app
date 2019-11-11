import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { YoutubeService } from '../youtube.service';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DataService } from '../data.service'

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.less']
})
export class ResultsComponent implements OnInit {

  title = 'angular-developer-app';
  parentId: string;
  videos: any[];
  token;
  scrollDistance = 1;
  scrollUpDistance = 2;
  private unsubscribe$: Subject<any> = new Subject();
  constructor(private spinner: NgxSpinnerService, private youTubeService: YoutubeService, private _route: Router, private data:DataService) { }

  ngOnInit() {
    this.spinner.show()
    setTimeout(() => {
      this.spinner.hide()
    }, 3000)
    this.videos = [];
    let videoApi = this.youTubeService.getVideosForChanel();
    videoApi.subscribe(res => {
      this.token = res;
    });
    videoApi
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(lista => {
        for (let element of lista["items"]) {
          this.videos.push(element)
        }

      });
  }
  onScroll(token) {
    let videoApi = this.youTubeService.getVideosByPage(token);
    videoApi.subscribe(res => {
      this.token = res;
    });
    videoApi
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(lista => {
        for (let element of lista["items"]) {
          this.videos.push(element)
        }
      });
  }
  onClick(id) {
    this.parentId = id;
    this.data.getDetails();
    // this._route.navigate(['/player'],{
    //   queryParams: {'id' : this.parentId}
    // })
    let url =this._route.createUrlTree(['/player'], {
      queryParams: { 'id': this.parentId }
    });
    window.open(url.toString(),'_blank')
    this.data.changeMessage("Hello from Sibling")
  }
}
