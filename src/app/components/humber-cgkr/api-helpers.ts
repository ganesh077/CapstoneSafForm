import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Datahelper } from './data-helpers';
import { environment } from 'src/environments/environment';

export class Apihelpers {
  private _dh: Datahelper;

  constructor(private http: HttpClient) {
    this._dh = new Datahelper();
  }

  // async function to fetch student data
  async fetchStudent(id: string) {
    try {
      const data = await this.subbing(id);
      const studentList = data.recordset[0];

      // set student data to Datahelper instance
      this._dh.photo = studentList.photo;
      this._dh.lastName = studentList.lastName;
      this._dh.firstName = studentList.firstName;
      this._dh.middleName = studentList.middleName;
      this._dh.email = studentList.email;
      this._dh.phones = studentList.phones;
      this._dh.humberId = studentList.humberId;
      this._dh.additionalId = studentList.additionalId;
      this._dh.term = studentList.term;
      this._dh.program_code = studentList.program_code;
      this._dh.program_desc = studentList.program_desc;
      this._dh.status = studentList.status;
      this._dh.academicStanding = studentList.academicStanding;

      return this._dh;
    } catch (error) {
      console.error(error);
    }
  }

  // function to get Datahelper instance
  getData() {
    return this._dh;
  }

  // async function to call API endpoint
  //Api call to fetch student details, use it to fetch student details from server.
  async subbing(id: string) {
    try {
      const response = await this.http
        .get<any>(`http://localhost:3000/${id}`)
        .toPromise();

      return response;
    } catch (error) {
      console.error(error);
    }
  }

  // function to submit form data to API endpoint
  submitFormData(formData: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization:
          'Basic ' + btoa(`${environment.username}:${environment.pass}`),
      }),
    };
    //Replace the url with JIRA backend server.
    return this.http.post(
      'http://localhost:8083/createTicket',
      formData,
      httpOptions
    );
  }
}
