import { Injectable } from '@angular/core';
import { SessionData } from '../models/session-data.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {

  }
  SaveSessionData(data: SessionData) {
    let stringData = JSON.stringify(data);
    localStorage.setItem('session-data', stringData);
  }

  GetInfoSession(){
    let dataString = localStorage.getItem('session-data');
    if(dataString){
      let data = JSON.parse(dataString);    
      return data;
    }else{
      return null;
    }
  }

 
  RemoveSessionData() {
    localStorage.removeItem('session-data');
  }

 
  GetToken(): string {
    let saved = localStorage.getItem('session-data');
    if (saved) {
      let data = JSON.parse(saved);
      return data.token;
    }
    return '';
  }
}
