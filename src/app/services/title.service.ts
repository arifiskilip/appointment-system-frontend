import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { TitleModel } from '../models/titleModel';
import { response } from 'express';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  titleModel: TitleModel[] = []


  constructor(private httpClient: HttpService) { }


  getTitles(): Observable<any> {
    let newPath = "title/GetAllByPaginated"
    // GetPaginatedPatientNewAppoinments?PageIndex=${this.pageIndex}&PageSize=${this.pageSize}`
    return this.httpClient.get<any[]>(newPath)
  
  }


  getTitlesPagination(pageIndex:number , pageSize:number): Observable<any> {
    let newPath = "title/GetAllByPaginated?Index="+pageIndex+"&Size="+pageSize
    // GetPaginatedPatientNewAppoinments?PageIndex=${this.pageIndex}&PageSize=${this.pageSize}`
    return this.httpClient.get<any[]>(newPath)
  
  }

 


  delete(id:number):Observable<void>{
    return this.httpClient.delete<void>("title/delete?Id=" + id) 
  }

  update(model:TitleModel):Observable<any>{
    return this.httpClient.put("title/update/", model)
  }

  add(title: TitleModel) {
    return this.httpClient.post("title/add", title)
  }
  
}




