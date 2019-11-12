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

  getVideosForChanel(search:string): Observable<Object> {
    let url = 'https://www.googleapis.com/youtube/v3/search?key=' + this.apiKey + '&order=date&part=snippet&type=video&maxResults=48&q=dog+'+search
    return this.http.get(url)
      .pipe(map((res) => {
        return res;
      }))
  }
  getVideosByPage(token): Observable<Object> {
    let url = 'https://www.googleapis.com/youtube/v3/search?key=' + this.apiKey + '&order=date&part=snippet&type=video&maxResults=48&pageToken='+token+'&q=dog'
    return this.http.get(url)
      .pipe(map((res) => {
        return res;
      }))
  }
  getVideoById(id): Observable<object>{
    let url = 'https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id='+id+'&key='+this.apiKey
    return this.http.get(url)
      .pipe(map((res) => {
        console.log(res);
        return res;
      }))
  }
}
