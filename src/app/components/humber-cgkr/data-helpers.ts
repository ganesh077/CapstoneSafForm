export class Datahelper {
  private _photo: string;
  private _lastName: string;
  private _email: string;
  private _firstName: string;
  private _middleName: string;
  private _phones: string;
  private _humberId: string;
  private _additionalId: string;
  private _term: string;
  private _program_code: string;
  private _program_desc: string;
  private _status: string;
  private _academicStanding: string;

  get photo(): string {
    return this._photo;
  }

  set photo(value: string) {
    this._photo = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get middleName(): string {
    return this._middleName;
  }

  set middleName(value: string) {
    this._middleName = value;
  }

  get phones(): string {
    return this._phones;
  }

  set phones(value: string) {
    this._phones = value;
  }

  get humberId(): string {
    return this._humberId;
  }

  set humberId(value: string) {
    this._humberId = value;
  }

  get additionalId(): string {
    return this._additionalId;
  }

  set additionalId(value: string) {
    this._additionalId = value;
  }

  get term(): string {
    return this._term;
  }

  set term(value: string) {
    this._term = value;
  }

  get program_code(): string {
    return this._program_code;
  }

  set program_code(value: string) {
    this._program_code = value;
  }

  get program_desc(): string {
    return this._program_desc;
  }

  set program_desc(value: string) {
    this._program_desc = value;
  }

  get status(): string {
    return this._status;
  }

  set status(value: string) {
    this._status = value;
  }

  get academicStanding(): string {
    return this._academicStanding;
  }

  set academicStanding(value: string) {
    this._academicStanding = value;
  }
}
