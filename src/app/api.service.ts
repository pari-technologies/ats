import { Injectable } from "@angular/core";
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class ApiService {
  private baseUrl = "api/create_jd.php"; // Replace with your PHP API URL

  constructor(private http: HttpClient) {}

  // Select operation
  getRecords() {
    const apiUrl = "api/create_jd.php";

    return this.http.get(apiUrl);
  }

  getCandidates() {
    const apiUrl = "api/get_candidates.php";

    // return this.http.get(apiUrl);

    return this.http.get(apiUrl).pipe(
      map((res: any) => {
        return res['list'];
      })
    );
  }

  getCandidatesById(id: number) {
    const apiUrl = `api/get_candidates_by_id.php?id=${id}`;

    // return this.http.get(apiUrl);

    return this.http.get(apiUrl).pipe(
      map((res: any) => {
        return res['list'];
      })
    );
  }

  getJobs() {
    const apiUrl = "api/get_jd.php";

    // return this.http.get(apiUrl);

    return this.http.get(apiUrl).pipe(
      map((res: any) => {
        return res['list'];
      })
    );
  }

  getJobsById(id: number) {
    const apiUrl = `api/get_jd_by_id.php?id=${id}`;

    // return this.http.get(apiUrl);

    return this.http.get(apiUrl).pipe(
      map((res: any) => {
        return res['list'];
      })
    );
  }


  sendFormData(formData: FormData) {
    const apiUrl = "api/create_jd.php";

    let headers = new HttpHeaders({
      'enctype': 'application/x-www-form-urlencoded:',
    });
  let options = { headers: headers };

    return this.http.post(apiUrl, formData,options);
  }

  // Update operation
  updateRecord(id: number, updatedData: any) {
    const apiUrl = `api/create_jd.php?id=${id}`;

    return this.http.put(apiUrl, updatedData);
  }


  // Delete operation
  deleteRecord(id: number) {
    const apiUrl = `api/create_jd.php?id=${id}`;

    return this.http.delete(apiUrl);
  }

  //Upload files
  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('cvfile', file);

    let headers = new HttpHeaders();
        /*
            this was the culprit:
            headers.append('Content-Type', 'multipart/form-data');
            worked for me by changing it to:
        */
    headers.append('enctype', 'multipart/form-data');
    headers.append('Accept', 'application/json');

    const req = new HttpRequest('POST', `api/create_cv.php`, formData, {
      reportProgress: true,
      responseType: 'json',
      headers:headers
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`files`);
  }

}