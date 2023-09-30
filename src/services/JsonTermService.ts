export default class JsonTermService {
    private _url: string = "http://localhost:3001/";
    //private _urlUsers: string = this._url + "users";
    //private _urlColumns: string = this._url + "colums";
    private _urlTerms: string = this._url + "terms";
    //private _urlCards: string = this._url + "cards";

    private _instance: JsonTermService | null = null;

    private constructor() {}

    public getInstance(): JsonTermService {
        return this._instance === null ? new JsonTermService() : this._instance;
    }
}