import { Injectable } from '@angular/core';
import { FeedbackModel } from '../models/feedbackModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FeedbackDetailModel } from '../models/feedbackDetailModel';
import { DoctorModel } from '../models/doctorModel';
import { BranchListModel } from '../models/branchListModel';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  apiUrl = "http://localhost:7073/api"
  constructor(private httpClient: HttpClient) { }

  getFeedbacksPagination(pageIndex: number, pageSize: number, orderbyList?: string, branchId?: number, doctorId?: number): Observable<any> {
    let newPath = this.apiUrl + "/Feedback/GetAllFeedbacksAdmin?PageIndex=" + pageIndex + "&PageSize=" + pageSize
    const url = new URL(newPath);
   
    // İlk parametre
    if (orderbyList !== undefined && orderbyList !== null) {
      url.searchParams.append('OrderDate', orderbyList);
    }
    // İkinci parametre
    if (branchId !== undefined && branchId != 0) {
      url.searchParams.append('BranchId', branchId.toString());
    }
    // Üçüncü parametre
    if (doctorId !== undefined && doctorId != 0) {
      url.searchParams.append('DoctorId', doctorId.toString());
    }
    newPath = url.toString();
    return this.httpClient.get<any[]>(newPath)
  }

  getFeedbackById(feedbackId: number): Observable<any> {
    let newPath = this.apiUrl + "/Feedback/GetFeedbackById?FeedbackId=" + feedbackId   
    return this.httpClient.get<FeedbackDetailModel>(newPath)
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.apiUrl + "/Feedback/DeleteFeedbackById?FeedbackId=" + id)
  }
}

