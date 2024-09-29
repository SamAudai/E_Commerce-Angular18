import { Injectable } from '@angular/core';
import { environment } from '../../core/environments/environment';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public user_url = environment.server_url + "/user/";
  public product_url = environment.server_url + "/products/";

  public all_user = environment.server_url + "/user";


  constructor(private apiService: ApiService) { }


  userDashboardData() {
    return this.apiService.get(this.user_url);
  }
  productDashboardData() {
    return this.apiService.get(this.product_url);
  }
  allUser(): Observable<any> {
    return this.apiService.get(this.all_user);
  }

  addUser(user_dto:any): Observable<any> {
    return this.apiService.post(this.user_url, user_dto);
  }

  //get data of individual user
  singleUser(user_id:any) {
    return this.apiService.get(this.user_url + user_id);
  }
  //update data of individual user
  editUser(user_id:any, user_dto:any): Observable<any> {
    return this.apiService.put(this.user_url + user_id, user_dto);
  }
  //Delete individual user
  deleteUser(user_id:any) {
    return this.apiService.delete(this.user_url + user_id);
  }
}
