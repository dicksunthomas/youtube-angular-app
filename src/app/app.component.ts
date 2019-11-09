import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { YoutubeService } from './youtube.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  // template: `

  // `
})
export class AppComponent {
  title = 'angular-developer-app';
  videos: any[];
  token;
  scrollDistance = 1;
  scrollUpDistance = 2;
  private unsubscribe$: Subject<any> = new Subject();
  constructor(private spinner: NgxSpinnerService, private youTubeService: YoutubeService) { }
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
}
