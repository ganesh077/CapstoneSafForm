import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Datahelper } from './data-helpers';
import { environment } from 'src/environments/environment';

export class Apihelpers {
  _arr: any[] = [];
  private _dh: Datahelper;
  constructor(private http: HttpClient) {
    this._dh = new Datahelper();
  }
  call: Apihelpers;
  
  async fetchStudent(id: string) {
    try {
      const data = await this.subbing(id);
      const studentList = data.recordset[0];
      // const array = Object.values(studentList).map(String);
      // this._arr = array;
      console.log('after this', studentList);

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
      console.log(this._dh);

      return this._dh;
    } catch (error) {
      console.error(error);
    }
  }
  getData() {
    return this._dh;
  }
  // console.log('Toggling toggle')
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
  submitFormData(formData: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization:
          'Basic ' + btoa(`${environment.username}:${environment.pass}`),
      }),
    };

    return this.http.post(
      'http://ec2-3-208-6-206.compute-1.amazonaws.com:8083/createTicket',
      formData,
      httpOptions
    );
  }
}
