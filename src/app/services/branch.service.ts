import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BranchModel } from '../models/branchModel';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  branchModel: BranchModel[] = []
  apiUrl = "https://localhost:7073/api"

  constructor(private httpClient: HttpClient) { }

  getBranchs(): Observable<any> {
    console.log("buradayım");
    let newPath = this.apiUrl + "/branch/GetAllByPaginated"
    return this.httpClient.get<any[]>(newPath)
  }

  getBranchsPagination(pageIndex: number, pageSize: number): Observable<any> {
    console.log("pageIndex" +pageIndex + "pageSize"+pageSize);
    let newPath = this.apiUrl + "/branch/GetAllByPaginated?Index="+pageIndex+"&Size="+pageSize
    console.log("newPath" +newPath)
    return this.httpClient.get<any[]>(newPath)
  }

  delete(id:number):Observable<void>{
    return this.httpClient.delete<void>(this.apiUrl+ "/branch/delete?Id=" + id) 
  }

  update(model:BranchModel):Observable<any>{
    console.log("model isdeleted:" + model.IsDeleted)
    // return this.httpClient.put<BranchModel>(`${this.apiUrl}/${data.Id}`,data);
    console.log("model---" +model)
    // return this.httpClient.put<BranchModel>(`${this.apiUrl+"/branch/update"}/${data.id}`,data);
    return this.httpClient.put(this.apiUrl + "/branch/update/", model)
  }

  add(branch: BranchModel) {
    return this.httpClient.post(this.apiUrl + "/branch/add", branch)
  } 
}

interface BranchModel2{
  Id:number,
  Name:string
}