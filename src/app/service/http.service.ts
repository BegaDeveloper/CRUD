import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  getEmployee() {
    return this.http.get('http://localhost:3000/posts').pipe(
      map((res) => {
        return res;
      })
    );
  }

  postEmployee(data: any) {
    return this.http.post('http://localhost:3000/posts', data).pipe(
      map((res) => {
        return res;
      })
    );
  }

  updateEmployee(data: any, id: number) {
    return this.http.put('http://localhost:3000/posts/' + id, data).pipe(
      map((res) => {
        return res;
      })
    );
  }

  deleteEmployee(id: number) {
    return this.http.delete('http://localhost:3000/posts/' + id).pipe(
      map((res) => {
        return res;
      })
    );
  }
}
