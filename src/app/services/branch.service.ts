import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BranchModel } from '../models/branchModel';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  branchModel: BranchModel[] = []

  constructor(private http: HttpService) { }

  getBranchs(): Observable<any> {
    return this.http.get<any[]>('branch/GetAllByPaginated')
  }

  getBranchsPagination(pageIndex: number, pageSize: number): Observable<any> {
    return this.http.get<any[]>("branch/GetAllByPaginated?Index="+pageIndex+"&Size="+pageSize)
  }

  delete(id:number):Observable<void>{
    return this.http.delete<void>("branch/delete?Id=" + id); 
  }

  update(model:BranchModel):Observable<any>{
    return this.http.put("branch/update/", model)
  }

  add(branch: BranchModel) {
    return this.http.post("branch/add", branch)
  } 
}
