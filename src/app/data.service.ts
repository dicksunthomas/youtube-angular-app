import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
export class DataService{
    private details: string;
    getDetails(){
        this.details = 'https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc&key=AIzaSyDLU7WrMYHTGFuJpeYtlUrFs1GcSjYjKpA'
       return this.http.get(this.details)
       .pipe(map((res) => {
           return res;
       }))
    }

    private messageSource = new BehaviorSubject<string>(this.details);
    currentMessage = this.messageSource.asObservable();
    constructor(public http: HttpClient){}
    
    changeMessage(message : string){
        this.messageSource.next(message)
    }


}