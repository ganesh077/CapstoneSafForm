import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Datahelper } from './data-helpers';

export class Apihelpers {
  _arr: any[] = [];
  private _dh: Datahelper;
  constructor(private http: HttpClient) {
    this._dh = new Datahelper();
  }

  async fetchStudent(id: string) {
    try {
      const data = await this.subbing(id);
      const studentList = data.recordset[0];
      const array = Object.values(studentList).map(String);
      this._arr = array;
      console.log('after this', this._arr);

      this._dh.photo = this._arr[0];
      this._dh.lastName = this._arr[1];
      this._dh.firstName = this._arr[2];
      this._dh.middleName = this._arr[3];
      this._dh.email = this._arr[4];
      this._dh.phones = this._arr[5];
      this._dh.humberId = this._arr[6];
      this._dh.additionalId = this._arr[7];
      this._dh.term = this._arr[8];
      this._dh.programCode = this._arr[9];
      this._dh.programDesc = this._arr[10];
      this._dh.status = this._arr[11];
      this._dh.academicStanding = this._arr[12];
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
}
