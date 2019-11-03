import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  apiKey : string = 'AIzaSyDLU7WrMYHTGFuJpeYtlUrFs1GcSjYjKpA';

  constructor(public http: HttpClient) { }

  getVideosForChanel(): Observable<Object> {
    let url = 'https://www.googleapis.com/youtube/v3/search?key=' + this.apiKey + '&order=date&part=snippet&type=video&maxResults=50&q=dog'
    return this.http.get(url)
      .pipe(map((res) => {
        return res;
      }))
  }
}
