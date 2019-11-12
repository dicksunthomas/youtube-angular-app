import { Injectable } from '@angular/core';

@Injectable()
export class DataService {
  public sharedData:string;

  constructor(){
    this.sharedData = "String from myService";
  }

  setData (data) {
    this.sharedData = data;
  }
  getData () {
    return this.sharedData;
  }
}