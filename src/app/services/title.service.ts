import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { TitleModel } from '../models/titleModel';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  titleModel: TitleModel[] = []
  apiUrl = "https://localhost:7073/api"

  constructor(private httpClient: HttpClient) { }


  getTitles(): Observable<any> {
    let newPath = this.apiUrl + "/title/GetAllByPaginated"
    // GetPaginatedPatientNewAppoinments?PageIndex=${this.pageIndex}&PageSize=${this.pageSize}`
    return this.httpClient.get<any[]>(newPath)
  
  }


  getTitlesPagination(pageIndex:number , pageSize:number): Observable<any> {
    let newPath = this.apiUrl + "/title/GetAllByPaginated?Index="+pageIndex+"&Size="+pageSize
    // GetPaginatedPatientNewAppoinments?PageIndex=${this.pageIndex}&PageSize=${this.pageSize}`
    return this.httpClient.get<any[]>(newPath)
  
  }

 


  delete(id:number):Observable<void>{
    return this.httpClient.delete<void>(this.apiUrl+ "/title/delete?Id=" + id) 
  }

  update(model:TitleModel):Observable<any>{
    return this.httpClient.put(this.apiUrl + "/title/update/", model)
  }

  add(title: TitleModel) {
    return this.httpClient.post(this.apiUrl + "/title/add", title)
  }
  
}




