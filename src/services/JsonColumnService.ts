export default class JsonColumnService {
    private _url: string = "http://localhost:3001/";
    //private _urlUsers: string = this._url + "users";
    private _urlColumns: string = this._url + "colums";
    //private _urlTerms: string = this._url + "terms";
    //private _urlCards: string = this._url + "cards";

    private _instance: JsonColumnService | null = null;

    private constructor() {}

    public getInstance(): JsonColumnService {
        return this._instance === null ? new JsonColumnService() : this._instance;
    }
}