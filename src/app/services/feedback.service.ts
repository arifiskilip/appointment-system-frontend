import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FeedbackDetailModel } from '../models/feedbackDetailModel';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  constructor(private httpClient: HttpService) { }

  getFeedbacksPagination(pageIndex: number, pageSize: number, orderbyList?: string, branchId?: number, doctorId?: number): Observable<any> {
    let newPath = "Feedback/GetAllFeedbacksAdmin?PageIndex=" + pageIndex + "&PageSize=" + pageSize
    // İlk parametre
    if (orderbyList !== undefined && orderbyList !== null) {
      newPath+='&OrderDate='+orderbyList;
    }
    // İkinci parametre
    if (branchId !== undefined && branchId != 0) {
      newPath+='&BranchId='+branchId.toString();
    }
    // Üçüncü parametre
    if (doctorId !== undefined && doctorId != 0) {
      newPath+='&DoctorId='+doctorId.toString();
    }
    return this.httpClient.get<any[]>(newPath)
  }

  getFeedbackById(feedbackId: number): Observable<any> {
    let newPath = "Feedback/GetFeedbackById?FeedbackId=" + feedbackId   
    return this.httpClient.get<FeedbackDetailModel>(newPath)
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>("Feedback/DeleteFeedbackById?FeedbackId=" + id)
  }
}

