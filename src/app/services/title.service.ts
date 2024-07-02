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
    console.log("buradayım")
    let newPath = this.apiUrl + "/title/GetAllByPaginated"
    // GetPaginatedPatientNewAppoinments?PageIndex=${this.pageIndex}&PageSize=${this.pageSize}`
    return this.httpClient.get<any[]>(newPath)
  
  }


  getTitlesPagination(pageIndex:number , pageSize:number): Observable<any> {
    console.log("pageIndex" +pageIndex + "pageSize"+pageSize)
    let newPath = this.apiUrl + "/title/GetAllByPaginated?Index="+pageIndex+"&Size="+pageSize
    // GetPaginatedPatientNewAppoinments?PageIndex=${this.pageIndex}&PageSize=${this.pageSize}`
    console.log("newPath" +newPath)
    return this.httpClient.get<any[]>(newPath)
  
  }

 


  delete(id:number):Observable<void>{
    // return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
    return this.httpClient.delete<void>(this.apiUrl+ "/title/delete?Id=" + id) 
    // http://localhost:5107/api/Title/Delete?Id=15
  }

  update(model:TitleModel):Observable<any>{
console.log("model isdeleted:" + model.IsDeleted)
    // return this.httpClient.put<TitleModel>(`${this.apiUrl}/${data.Id}`,data);
    console.log("model---" +model)
    // return this.httpClient.put<TitleModel>(`${this.apiUrl+"/title/update"}/${data.id}`,data);
    return this.httpClient.put(this.apiUrl + "/title/update/", model)
  }

  add(title: TitleModel) {
    return this.httpClient.post(this.apiUrl + "/title/add", title)
  }
  
}
interface TitleModel2{
  Id:number,
  Name:string

}




