export default class JsonUserService {
    private _url: string = "http://localhost:3001/";
    private _urlUsers: string = this._url + "users";
    //private _urlColumns: string = this._url + "colums";
    //private _urlTerms: string = this._url + "terms";
    //private _urlCards: string = this._url + "cards";

    private _instance: JsonUserService | null = null;

    private constructor() {}

    public getInstance(): JsonUserService {
        return this._instance === null ? new JsonUserService() : this._instance;
    }
}